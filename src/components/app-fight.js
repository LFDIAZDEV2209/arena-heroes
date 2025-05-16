const player1 = '/img/cyraxSMALL.webp';
const player2 = '/img/quan chiSMALL.webp';
const vs = '/img/vsLOGO.png';
const video = '/src/assets/videoAttack.mp4';

export class AppFight extends HTMLElement {
  constructor() {
    super();
    this.player1Data = null;
    this.player2Data = null;
    this.gameMode = null;
    this.currentTurn = 1;
    this.isFighting = false;
    this.health1 = 100;
    this.health2 = 100;
    this.handleFightEvent = this.handleFightEvent.bind(this);

  }

  handleFightEvent(event) {
    this.player1Data = event.detail.player1;
    this.player2Data = event.detail.player2;
    this.gameMode = event.detail.gameMode;
    this.health1 = 100;
    this.health2 = 100;
    this.render();
  }

  connectedCallback() {
    document.addEventListener('startFight', this.handleFightEvent);

    if (!this.player1Data || !this.player2Data) {
      const storedData = sessionStorage.getItem('fightData');
      if (storedData) {
        const data = JSON.parse(storedData);
        this.player1Data = data.player1;
        this.player2Data = data.player2;
        this.gameMode = data.gameMode;
        this.health1 = 100;
        this.health2 = 100;
      }
    }

    this.render();
  }

  disconnectedCallback() {
    document.removeEventListener('startFight', this.handleFightEvent);
  }

  startFight() {
    this.isFighting = true;
    this.currentTurn = 1;
    this.updateTurn();
  }

  updateTurn() {
    const attackButton1 = this.querySelector('#attackButton1');
    const attackButton2 = this.querySelector('#attackButton2');

    if (attackButton1) attackButton1.style.display = 'none';
    if (attackButton2) attackButton2.style.display = 'none';

    if (this.currentTurn === 1) {
      if (this.gameMode === 'pvp' || this.gameMode === 'pvc') {
        if (attackButton1) {
          attackButton1.style.display = 'block';
        }
      } else if (this.gameMode === 'cvc') {
        // En modo CvC, CPU 1 ataca automáticamente
        setTimeout(() => this.performAttack(1), 1000);
      }
    } else {
      if (this.gameMode === 'pvp') {
        if (attackButton2) {
          attackButton2.style.display = 'block';
        }
      } else if (this.gameMode === 'pvc' || this.gameMode === 'cvc') {
        // En modo PvC o CvC, CPU 2 ataca automáticamente
        setTimeout(() => this.performAttack(2), 1000);
      }
    }
  }

  performAttack(attackerNumber) {
    if (!this.isFighting) return;

    const defenderNumber = attackerNumber === 1 ? 2 : 1;
    const attacker = attackerNumber === 1 ? this.player1Data : this.player2Data;
    const defender = defenderNumber === 1 ? this.player1Data : this.player2Data;

    // Calcular daño
    const attackValue = parseInt(attacker.abilities.attack) || 0;
    const damageValue = parseInt(attacker.abilities.damage) || 0;
    const strengthValue = parseInt(defender.abilities.strength) || 0;

    const damage = Math.max(1, Math.floor(
      (attackValue * 0.7) + 
      (damageValue * 0.3) - 
      (strengthValue * 0.2)
    ));

    console.log('Attack calculation:', {
      attacker: attacker.name,
      defender: defender.name,
      attackValue,
      damageValue,
      strengthValue,
      calculatedDamage: damage,
      gameMode: this.gameMode
    });

    // Actualizar la vida
    if (defenderNumber === 1) {
      this.health1 = Math.max(0, this.health1 - damage);
      const healthBar = this.querySelector('#vida1');
      console.log('Player 1 health update:', {
        newHealth: this.health1,
        healthBarFound: !!healthBar
      });
      if (healthBar) {
        healthBar.style.width = `${this.health1}%`;
        this.updateHealthBarColor(healthBar, this.health1);
      }
    } else {
      this.health2 = Math.max(0, this.health2 - damage);
      const healthBar = this.querySelector('#vida2');
      console.log('Player 2 health update:', {
        newHealth: this.health2,
        healthBarFound: !!healthBar
      });
      if (healthBar) {
        healthBar.style.width = `${this.health2}%`;
        this.updateHealthBarColor(healthBar, this.health2);
      }
    }

    // Mostrar efecto de daño
    const damageOverlay = this.querySelector(`#damage-overlay-${defenderNumber}`);
    if (damageOverlay) {
      damageOverlay.classList.remove('opacity-0');
      damageOverlay.classList.add('opacity-100');
      setTimeout(() => {
        damageOverlay.classList.remove('opacity-100');
        damageOverlay.classList.add('opacity-0');
      }, 300);
    }

    // Cambiar el turno
    this.currentTurn = defenderNumber;
    this.updateTurn();

    // Verificar si el juego ha terminado
    if (this.health1 <= 0 || this.health2 <= 0) {
      this.endFight(attackerNumber);
    }
  }

  updateHealthBarColor(healthBar, health) {
    healthBar.classList.remove('bg-green-400', 'bg-yellow-400', 'bg-red-500');
    if (health <= 30) {
      healthBar.classList.add('bg-red-500');
    } else if (health <= 60) {
      healthBar.classList.add('bg-yellow-400');
    } else {
      healthBar.classList.add('bg-green-400');
    }
  }

  showModalWinner(winnerNumber) {
    const winnerName = winnerNumber === 1 ? this.player1Data.name : this.player2Data.name;
    const winnerImage = winnerNumber === 1 ? this.player1Data.image : this.player2Data.image;
    const loserImage = winnerNumber === 1 ? this.player2Data.image : this.player1Data.image;
    const loserName = winnerNumber === 1 ? this.player2Data.name : this.player1Data.name;

    console.log('[showModalWinner] Renderizando app-ganador con:', {
      winnerName, winnerImage, loserName, loserImage, winnerNumber, player1Data: this.player1Data, player2Data: this.player2Data
    });

    // Crear el componente app-ganador
    const ganadorComponent = document.createElement('app-ganador');
    ganadorComponent.setAttribute('winner-name', winnerName);
    ganadorComponent.setAttribute('winner-image', winnerImage);
    ganadorComponent.setAttribute('loser-name', loserName);
    ganadorComponent.setAttribute('loser-image', loserImage);
    
    // Reemplazar el contenido actual con el componente ganador
    // this.innerHTML = '';
    // videoFrame.pause();
    // videoFrame.currentTime = 0;
    // this.appendChild(ganadorComponent);

    const modal = this.querySelector("#modal");
    const videoFrame = this.querySelector("#videoFrame");
    if (videoFrame) {
      videoFrame.pause();
      videoFrame.currentTime = 0;
    }
    if (modal) {
      modal.classList.add("hidden");
    }
    this.innerHTML = '';
    this.appendChild(ganadorComponent);

    // Agregar evento para el botón de volver
    const backBtn = ganadorComponent.querySelector('#backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        // Disparar evento para volver a la vista principal
        document.dispatchEvent(new CustomEvent('viewChange', {
          detail: {
            view: 'home'
          }
        }));
      });
    }
  }

  endFight(winnerNumber) {
    this.isFighting = false;
    const modal = this.querySelector("#modal");
    const videoFrame = this.querySelector("#videoFrame");
    if (modal) {
      modal.classList.remove("hidden");
    }
    if (videoFrame) {
      videoFrame.play();
    }
    setTimeout(() => this.showModalWinner(winnerNumber), 5000); 
  }

  async render() {
    const player1Image = this.player1Data ? this.player1Data.image : player1;
    const player2Image = this.player2Data ? this.player2Data.image : player2;
    const player1Name = this.player1Data ? this.player1Data.name : 'Player 1';
    const player2Name = this.player2Data ? this.player2Data.name : 'Player 2';

    this.innerHTML = `
          <style>
            .btn {
              position: relative;
              letter-spacing: 0.25em;
              margin: 0 auto;
              padding: 1rem 2.8rem;
              background: transparent;
              outline: none;
              font-size: 28px;
              color: #fff;
              z-index: 1;
              text-transform: uppercase;
              text-decoration: none;
              font-weight: 700;
            }

            .btn::after,
            .btn::before {
              content: "";
              position: absolute;
              height: 100%;
              width: 50%;
              transform: skewX(30deg);
              transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              z-index: -2;
            }

            .btn::before {
              background: linear-gradient(147deg,#f4e179 0%, #c1972a 35%, #a26808 100%);
              top: -1rem;
              left: 0rem;
            }

            .btn::after {
              background: linear-gradient(230deg,rgba(244, 225, 121, 1) 0%, rgba(193, 151, 42, 1) 31%, rgba(162, 104, 8, 1) 100%);
              top: 1rem;
              left: 6rem;
            }

            .btn:hover::before,
            .btn:hover::after {
              top: 0;
              transform: skewX(0deg);
            }

            .btn:hover::after {
              left: 0rem;
            }

            .btn:hover::before {
              left: 6.45rem;
            }

            .health-bar {
              width: 100%;
              height: 100%;
              transition: width 0.5s ease-in-out;
              will-change: width;
            }
          </style>

          <div class="w-[90%] h-screen flex flex-col items-center justify-center">
            <div class="flex flex-col sm:flex-row justify-center items-center w-full sm:w-4/5 mx-auto m-4 gap-2 sm:gap-8">
              <!-- Player 1 -->
              <div id="player1-card" class="group relative w-full max-w-xs sm:w-[300px] sm:h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer mb-4 sm:mb-0">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player1Image}');"></div>
                <div id="damage-overlay-1" class="absolute top-0 left-0 w-full h-full bg-red-500/30 opacity-0 transition-opacity duration-300 pointer-events-none z-5"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                  <h3 class="w-full text-2xl text-yellow-500 mt-0">${player1Name}</h3>
                  <div class="w-[90%] mb-4">
                    <p class="text-white text-xl skew-y-[3deg]">Vida</p>
                    <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div id="vida1" class="health-bar bg-green-400" style="width: ${this.health1}%;"></div>
                    </div>
                  </div>
                  <div class="hidden group-hover:flex flex-col gap-1 text-sm text-white mt-2">
                    <p>⚔️ Fuerza:   ${this.player1Data?.abilities.attack || '0'}</p>
                    <p>🛡️ Defensa:  ${this.player1Data?.abilities.strength || '0'}</p>
                    <p>💨 Velocidad:${this.player1Data?.abilities.damage || '0'}</p>
                    <p>🎯 Precisión:${this.player1Data?.abilities.weakness || '0'}</p>
                </div>
                  ${this.gameMode === 'pvp' || this.gameMode === 'pvc' ? `
                    <button id="attackButton1" class="bg-gradient-to-r from-[#f4e179] via-[#c1972a] to-[#a26808] text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg mt-4" style="display: none;">Atacar
                      <audio id="soundtrack">
                        <source src="src/assets/audios/golpe.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                      </audio>
                    </button>
                  ` : ''}
                </div>
              </div>

              <!-- VS -->
              <div class="flex items-center justify-center w-full sm:w-[200px] my-4 sm:my-0">
                <img src="${vs}" alt="versus" class="w-24 h-24 sm:w-full sm:h-auto" />
              </div>

              <!-- Player 2 -->
              <div id="player2-card" class="group relative w-full max-w-xs sm:w-[300px] sm:h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player2Image}');"></div>
                <div id="damage-overlay-2" class="absolute top-0 left-0 w-full h-full bg-red-500/30 opacity-0 transition-opacity duration-300 pointer-events-none z-5"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                  <h3 class="w-full text-2xl text-yellow-500 mt-0">${player2Name}</h3>
                  <div class="w-[90%] mb-4">
                    <p class="text-white text-xl skew-y-[3deg]">Vida</p>
                    <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div id="vida2" class="health-bar bg-green-400" style="width: ${this.health2}%;"></div>
                    </div>
                  </div>
                  <div class="hidden group-hover:flex flex-col gap-1 text-sm text-white mt-2">
                    <p>⚔️ Fuerza:   ${this.player2Data?.abilities.attack || '0'}</p>
                    <p>🛡️ Defensa:  ${this.player2Data?.abilities.strength || '0'}</p>
                    <p>💨 Velocidad:${this.player2Data?.abilities.damage || '0'}</p>
                    <p>🎯 Precisión:${this.player2Data?.abilities.weakness || '0'}</p>
                </div>
                  ${this.gameMode === 'pvp' ? `
                    <button id="attackButton2" class="bg-gradient-to-r from-[#f4e179] via-[#c1972a] to-[#a26808] text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg mt-4" style="display: none;">Atacar
                      <audio id="soundtrack">
                        <source src="src/assets/audios/golpe.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                      </audio>
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Start Fight Button -->
            <div class="text-center mt-6">
              <button id="startFightButton" class="btn">Fight</button>
            </div>
          </div>

          <!-- Modal -->
        <div id="modal"
            class="modal hidden z-10 w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-70">
            <div class="modal-content bg-black rounded-lg shadow-lg p-4 relative w-[90%] max-w-3xl">
            <button id="closeModal" class="modal-close absolute top-2 right-4 cursor-pointer z-50">✖</button>
            <video id="videoFrame"
                    src="${video}"
                    class="w-[90%] m-10 aspect-video rounded-md"
                    autoplay
                    controls
                    muted></video>
            </div>
        </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const startFightButton = this.querySelector('#startFightButton');
    const attackButton1 = this.querySelector('#attackButton1');
    const attackButton2 = this.querySelector('#attackButton2');


    if (startFightButton) {
      startFightButton.addEventListener('click', () => {
        this.startFight();
        startFightButton.style.display = 'none';
      });
    }

    if (attackButton1) {
      attackButton1.addEventListener('click', () => {
        this.performAttack(1);
      });
    }

    if (attackButton2) {
      attackButton2.addEventListener('click', () => {
        this.performAttack(2);
      });
    }
  }
}

customElements.define("app-fight", AppFight);