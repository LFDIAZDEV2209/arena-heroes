const player1 = '/img/cyraxSMALL.webp';
const player2 = '/img/quan chiSMALL.webp';
const vs = '/img/vsLOGO.png';

export class AppFight extends HTMLElement {
  constructor() {
    super();
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
          background: #F4E179;
        background: linear-gradient(147deg,#f4e179 0%, #c1972a 35%, #a26808 100%);

          top: -1rem;
          left: 0rem;
        }

        .btn::after {
          background: #F4E179;
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
      </style>
        <div class="w-screen h-screen flex flex-col items-center justify-center ">
            <div class="flex justify-center items-center flex-row w-4/5 mx-auto m-8">
                <!-- Player 1 -->
                <div class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 
                            transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player1}');"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                    <h3 class="w-full text-2xl text-yellow-500 mt-0">Player 1</h3>
                    <div class="w-[90%] mb-4">
                    <div class="mb-3">
                        <p class="w-full text-white text-xl skew-y-[3deg] m-0">Vida</p>
                        <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-green-400 transition-all duration-500" style="width: 80%;"></div>
                        </div>
                    </div>
                    </div>
                    <!-- Hover content -->
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
                <div class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 
                            transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${player2}');"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                    <h3 class="w-full text-2xl text-yellow-500 mt-0">Player 2</h3>
                    <div class="w-[90%] mb-4">
                    <div class="mb-3">
                        <p class="w-full text-white text-xl skew-y-[3deg] m-0">Vida</p>
                        <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-green-400 transition-all duration-500" style="width: 60%;"></div>
                        </div>
                    </div>
                    </div>
                    <!-- Hover content -->
                    <div class="hidden group-hover:flex flex-col gap-1 text-sm text-white mt-2">
                    <p>⚔️ Fuerza: 90</p>
                    <p>🛡️ Defensa: 60</p>
                    <p>💨 Velocidad: 75</p>
                    <p>🎯 Precisión: 80</p>
                    </div>
                </div>
                </div>
            </div>

        <!-- FIGHT Button -->
            <div class="text-center mt-6">
                <a href="#" class="btn">Fight</a>
            </div>
        </div>
        
    </div>
    `;
  }
}

customElements.define("app-fight", AppFight);