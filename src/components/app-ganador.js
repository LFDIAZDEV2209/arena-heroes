const player1 = '/img/cyraxSMALL.webp';
const player2 = '/img/quan chiSMALL.webp';
const vs = '/img/vsLOGO.png';

export class AppGanador extends HTMLElement {
  constructor() {
    super();
    this.winnerName = '';
    this.winnerImage = '';
    this.loserName = '';
    this.loserImage = '';
  }

  static get observedAttributes() {
    return ['winner-name', 'winner-image', 'loser-name', 'loser-image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'winner-name':
          this.winnerName = newValue;
          break;
        case 'winner-image':
          this.winnerImage = newValue;
          break;
        case 'loser-name':
          this.loserName = newValue;
          break;
        case 'loser-image':
          this.loserImage = newValue;
          break;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
        @keyframes shake {
          0% {transform: translateX(0);}
          25% {transform: translateX(-5px);}
          50% {transform: translateX(5px);}
          75% {transform: translateX(-5px);}
          100% {transform: translateX(0);}
        }
        .winner-card { animation: shake 0.5s ease-in-out; }
      </style>
      <div class="w-[90vw] h-screen flex flex-col items-center justify-center">
        <div class="flex flex-row justify-center items-center w-full sm:w-4/5 mx-auto m-2 sm:m-4 gap-2 sm:gap-8">
          <!-- Ganador -->
          <div id="player1-card" class="winner-card group relative w-[130px] h-[320px] sm:w-[350px] sm:h-[450px] border-10 border-amber-300 overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${this.winnerImage || player1}');"></div>
            <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
              <h3 class="w-full text-2xl text-yellow-500 mt-0">${this.winnerName || 'Player 1'}</h3>
              <div class="w-[90px] h-[40px] sm:w-[150px] sm:h-[60px] bg-gradient-to-r from-[#E2B077] to-[#EBB43C] border-0 -skew-3">
                <h3 class="font-semibold text-sm sm:text-3xl justify-self-center-safe pt-1 sm:pt-2">Ganador</h3>
              </div>
            </div>
          </div>
          <!-- VS -->
          <div class="flex items-center justify-center w-[80px] sm:w-[200px] my-0">
            <img src="${vs}" alt="versus" class="w-16 h-16 sm:w-full sm:h-auto" />
          </div>
          <!-- Perdedor -->
          <div id="player2-card" class="group relative w-[130px] h-[320px] sm:w-[200px] sm:h-[300px] border-2 border-gray-300 overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${this.loserImage || player2}');"></div>
            <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-black opacity-40"></div>
            <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
              <h3 class="w-full text-2xl text-yellow-500 mt-0">${this.loserName || 'Player 2'}</h3>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("app-ganador", AppGanador);