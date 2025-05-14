const player1 = '/img/cyraxSMALL.webp';
const player2 = '/img/quan chiSMALL.webp';
const vs = '/img/vsLOGO.png';

export class AppFight extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
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
      </style>

      <div class="w-screen h-screen flex flex-col items-center justify-center">
        <div class="flex justify-center items-center flex-row w-4/5 mx-auto m-8">
          <!-- Player 1 -->
          <div id="player1-card" class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player1}');"></div>
            <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
              <h3 class="w-full text-2xl text-yellow-500 mt-0">Player 1</h3>
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
            <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player2}');"></div>
            <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
              <h3 class="w-full text-2xl text-yellow-500 mt-0">Player 2</h3>
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
          <a href="#" id="fightBtn" class="btn">Fight</a>
        </div>

        <!-- Attack Buttons -->
        <div id="attackButtons" class="mt-6 flex gap-4 hidden">
          <button id="golpear1" class="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Golpear a Player 1</button>
          <button id="golpear2" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Golpear a Player 2</button>
        </div>
      </div>
    `;

    // Lógica de botones
    const fightBtn = this.querySelector("#fightBtn");
    const attackButtons = this.querySelector("#attackButtons");

    const golpe1 = this.querySelector("#golpear1");
    const golpe2 = this.querySelector("#golpear2");

    fightBtn.addEventListener("click", (e) => {
      e.preventDefault();
      attackButtons.classList.remove("hidden");
    });

    golpe1.addEventListener("click", () => {
      this.golpear("vida1", "player1-card");
    });

    golpe2.addEventListener("click", () => {
      this.golpear("vida2", "player2-card");
    });
  }

  golpear(barraId, cardId) {
    const barra = this.querySelector(`#${barraId}`);
    const card = this.querySelector(`#${cardId}`);
    const actual = parseFloat(barra.style.width);
    const nuevo = Math.max(actual - 10, 0);
    barra.style.width = `${nuevo}%`;

    // Animación de golpe
    card.classList.add("hit-animation");
    setTimeout(() => card.classList.remove("hit-animation"), 300);

    // Cambio de color de la barra de vida
    barra.classList.remove("bg-green-400", "bg-yellow-400", "bg-red-500");
    if (nuevo < 30) {
      barra.classList.add("bg-red-500");
    } else if (nuevo < 60) {
      barra.classList.add("bg-yellow-400");
    } else {
      barra.classList.add("bg-green-400");
    }
  }
}

customElements.define("app-fight", AppFight);
