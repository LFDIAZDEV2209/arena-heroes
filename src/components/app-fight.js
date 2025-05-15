const player1 = '/img/cyraxSMALL.webp';
const player2 = '/img/quan chiSMALL.webp';
const vs = '/img/vsLOGO.png';
const video = '/src/assets/video-main.mp4';

export class AppFight extends HTMLElement {
  constructor() {
    super();
    this.player1Data = null;
    this.player2Data = null;
    this.gameMode = null;
  }

  connectedCallback() {
    // Escuchar el evento startFight
    document.addEventListener('startFight', (event) => {
      this.player1Data = event.detail.player1;
      this.player2Data = event.detail.player2;
      this.gameMode = event.detail.gameMode;
      this.render();
    });

    // Si ya tenemos los datos (por ejemplo, si la página se recargó), intentar recuperarlos
    if (!this.player1Data || !this.player2Data) {
      const storedData = sessionStorage.getItem('fightData');
      if (storedData) {
        const data = JSON.parse(storedData);
        this.player1Data = data.player1;
        this.player2Data = data.player2;
        this.gameMode = data.gameMode;
      }
    }

    this.render();
  }

  disconnectedCallback() {
    // Limpiar el listener cuando el componente se desconecta
    document.removeEventListener('startFight', this.handleFightEvent);
  }

  async render() {
    // Guardar los datos en sessionStorage para persistencia
    if (this.player1Data && this.player2Data) {
      sessionStorage.setItem('fightData', JSON.stringify({
        player1: this.player1Data,
        player2: this.player2Data,
        gameMode: this.gameMode
      }));
    }

    // Usar las imágenes de los personajes seleccionados si están disponibles
    const player1Image = this.player1Data ? this.player1Data.image : player1;
    const player2Image = this.player2Data ? this.player2Data.image : player2;
    const player1Name = this.player1Data ? this.player1Data.name : 'Player 1';
    const player2Name = this.player2Data ? this.player2Data.name : 'Player 2';

    this.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

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

            .hit-animation {
              animation: shake 0.3s;
            }

            @keyframes shake {
              0% {transform: translateX(0);}
              25% {transform: translateX(-5px);}
              50% {transform: translateX(5px);}
              75% {transform: translateX(-5px);}
              100% {transform: translateX(0);}
            }

            .damage-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 0, 0, 0.3);
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none;
              z-index: 5;
            }

            .modal-close {
              color: white !important;
              font-size: 2rem;
              opacity: 0.8;
              transition: opacity 0.3s ease;
              cursor: pointer;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }

            .modal-close:hover {
              opacity: 1;
            }
          </style>

          <div class="w-screen h-screen flex flex-col items-center justify-center">
            <div class="flex justify-center items-center flex-row w-4/5 mx-auto m-8">
              <!-- Player 1 -->
              <div id="player1-card" class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player1Image}');"></div>
                <div id="damage-overlay-1" class="damage-overlay"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                  <h3 class="w-full text-2xl text-yellow-500 mt-0">${player1Name}</h3>
                  <div class="w-[90%] mb-4">
                    <p class="text-white text-xl skew-y-[3deg]">Vida</p>
                    <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div id="vida1" class="h-full bg-green-400 transition-all duration-500" style="width: 100%;"></div>
                    </div>
                  </div>
                  <div class="hidden group-hover:flex flex-col gap-1 text-sm text-white mt-2">
                    <p>⚔️ Fuerza: 80</p>
                    <p>🛡️ Defensa: 70</p>
                    <p>💨 Velocidad: 65</p>
                    <p>🎯 Precisión: 85</p>
                  </div>
                </div>
              </div>

              <!-- VS -->
              <div class="flex items-center justify-center w-[200px]">
                <img src="${vs}" alt="versus" class="w-full h-auto" />
              </div>

              <!-- Player 2 -->
              <div id="player2-card" class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player2Image}');"></div>
                <div id="damage-overlay-2" class="damage-overlay"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                  <h3 class="w-full text-2xl text-yellow-500 mt-0">${player2Name}</h3>
                  <div class="w-[90%] mb-4">
                    <p class="text-white text-xl skew-y-[3deg]">Vida</p>
                    <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div id="vida2" class="h-full bg-green-400 transition-all duration-500" style="width: 100%;"></div>
                    </div>
                  </div>
                  <div class="hidden group-hover:flex flex-col gap-1 text-sm text-white mt-2">
                    <p>⚔️ Fuerza: 90</p>
                    <p>🛡️ Defensa: 60</p>
                    <p>💨 Velocidad: 75</p>
                    <p>🎯 Precisión: 80</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fight Button -->
            <div class="text-center mt-6">
              <button id="fightBtn" class="btn">Fight</button>
            </div>

            <!-- Botones de ataque separados -->
            <div id="attackButtonsPlayer1" class="mt-6 flex gap-4 hidden">
              <button id="golpear1" class="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Golpear a Player 1</button>
            </div>
            <div id="attackButtonsPlayer2" class="mt-6 flex gap-4 hidden">
              <button id="golpear2" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Golpear a Player 2</button>
            </div>

            <!-- Super Attack Buttons -->
            <div id="superAttacks" class="mt-6 flex gap-4 hidden">
              <button id="super1" class="bg-purple-700 px-4 py-2 rounded text-white hover:bg-purple-800">Super Ataque P1</button>
              <button id="super2" class="bg-pink-600 px-4 py-2 rounded text-white hover:bg-pink-700">Super Ataque P2</button>
            </div>
          </div>

          <div id="modal" class="modal hidden z-10 w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-70">
        <div class="modal-content bg-black rounded-lg shadow-lg p-4 relative w-[90%] max-w-3xl">
          <button id="closeModal" class="modal-close absolute top-2 right-4 cursor-pointer z-50">✖</button>
          <video id="videoFrame" src="${video}" class="w-[90%] m-10 aspect-video rounded-md" autoplay controls muted></video>
        </div>
      </div>
      
    `;

    // Esperar a que el DOM esté listo
    setTimeout(() => {
      // Elementos
      const fightBtn = this.querySelector("#fightBtn");
      const attackButtonsP1 = this.querySelector("#attack-buttons-p1");
      const attackButtonsP2 = this.querySelector("#attack-buttons-p2");
      const superAttacks = this.querySelector("#super-attacks");
      const super1 = this.querySelector("#super-attack-1");
      const super2 = this.querySelector("#super-attack-2");
      const modal = this.querySelector("#modal");
      const closeModal = this.querySelector("#closeModal");
      const vida1 = this.querySelector("#vida1");
      const vida2 = this.querySelector("#vida2");
      const videoFrame = this.querySelector("#videoFrame");
      const player1Card = this.querySelector("#player1-card");
      const player2Card = this.querySelector("#player2-card");
      const damageOverlay1 = this.querySelector("#damage-overlay-1");
      const damageOverlay2 = this.querySelector("#damage-overlay-2");

      if (!fightBtn || !modal || !closeModal || !vida1 || !vida2 || !videoFrame || !player1Card || !player2Card || !damageOverlay1 || !damageOverlay2) {
        console.error("No se pudieron encontrar todos los elementos necesarios");
        return;
      }

      // Variables de combate
      let salud1 = 100;
      let salud2 = 100;
      let turno = 1;
      let combateActivo = false;
      let superAtaqueActivado = false;
      let ganadorDeterminado = false;

      const calcularGolpe = () => {
        return Math.floor(Math.random() * 11) + 5;
      };

      const mostrarEfectoDaño = (jugador) => {
        const overlay = jugador === 1 ? damageOverlay1 : damageOverlay2;
        overlay.style.opacity = "1";
        setTimeout(() => {
          overlay.style.opacity = "0";
        }, 300);
      };

      const actualizarBarraVida = (barra, salud, jugador) => {
        barra.style.width = `${salud}%`;
        barra.classList.remove("bg-green-400", "bg-yellow-400", "bg-red-500");

        if (salud <= 30) {
          barra.classList.add("bg-red-500");
          if (!superAtaqueActivado) {
            superAtaqueActivado = true;
            activarSuperAtaque();
          }
        } else if (salud <= 60) {
          barra.classList.add("bg-yellow-400");
        } else {
          barra.classList.add("bg-green-400");
        }

        const card = jugador === 1 ? player1Card : player2Card;
        card.classList.add("hit-animation");
        mostrarEfectoDaño(jugador);
        setTimeout(() => card.classList.remove("hit-animation"), 300);
      };

      const activarSuperAtaque = () => {
        modal.classList.remove("hidden");
        videoFrame.play();
      };

      const determinarGanador = () => {
        if (ganadorDeterminado) return;
        ganadorDeterminado = true;

        let mensaje = '';
        if (salud1 > salud2) {
          mensaje = '🏆 ¡Player 1 Gana!';
        } else if (salud2 > salud1) {
          mensaje = '🏆 ¡Player 2 Gana!';
        } else {
          mensaje = '🤝 ¡Empate!';
        }

        const mensajesAnteriores = document.querySelectorAll('.mensaje-ganador');
        mensajesAnteriores.forEach(msg => msg.remove());

        const resultadoDiv = document.createElement('div');
        resultadoDiv.className = 'mensaje-ganador fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-8 rounded-lg text-3xl z-50';
        resultadoDiv.textContent = mensaje;
        document.body.appendChild(resultadoDiv);

        if (salud1 <= 0 || salud2 <= 0) {
          setTimeout(() => {
            resultadoDiv.remove();
            window.location.href = "/";
          }, 3000);
        } else {
          setTimeout(() => {
            resultadoDiv.remove();
          }, 3000);
        }
      };

      const ejecutarTurno = () => {
        if (!combateActivo) return;

        const golpe = calcularGolpe();

        if (turno === 1) {
          salud2 = Math.max(0, salud2 - golpe);
          actualizarBarraVida(vida2, salud2, 2);
          turno = 2;
        } else {
          salud1 = Math.max(0, salud1 - golpe);
          actualizarBarraVida(vida1, salud1, 1);
          turno = 1;
        }

        if (salud1 <= 0 || salud2 <= 0) {
          combateActivo = false;
          determinarGanador();
        } else {
          setTimeout(ejecutarTurno, 1000);
        }
      };

      // Event Listeners
      fightBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!combateActivo) {
          combateActivo = true;
          fightBtn.classList.add("hidden");
          ejecutarTurno();
        }
      });

      super1.addEventListener("click", () => {
        activarSuperAtaque();
      });

      super2.addEventListener("click", () => {
        activarSuperAtaque();
      });

      closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        videoFrame.pause();
        videoFrame.currentTime = 0;
      });

      videoFrame.addEventListener("ended", () => {
        modal.classList.add("hidden");
        videoFrame.currentTime = 0;
        if (!ganadorDeterminado) {
          determinarGanador();
        }
      });
    }, 0);
  }
}

customElements.define("app-fight", AppFight);