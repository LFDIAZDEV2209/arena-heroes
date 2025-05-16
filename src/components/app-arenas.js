const logo ='/public/img/logoBLACK.png'
const vs ='/public/img/vsLOGO.png'

export class AppArenas extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.addEventListener('click', (e) => {
            const pvpSection = e.target.closest('.border-yellow-600');
            const pvcSection = e.target.closest('.border-red-600');
            const cvcSection = e.target.closest('.border-blue-600');

            if (pvpSection) {
                this.dispatchEvent(new CustomEvent('gameModeSelected', {
                    detail: { mode: 'pvp' },
                    bubbles: true,
                    composed: true
                }));
            } else if (pvcSection) {
                this.dispatchEvent(new CustomEvent('gameModeSelected', {
                    detail: { mode: 'pvc' },
                    bubbles: true,
                    composed: true
                }));
            } else if (cvcSection) {
                this.dispatchEvent(new CustomEvent('gameModeSelected', {
                    detail: { mode: 'cvc' },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }

    render(){
        this.innerHTML=`
          <div class="containerArenas invisible-scrollbar grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-5 max-w-[800px] mx-auto p-4 sm:p-8 md:p-16 overflow-auto min-h-screen">
            <!-- Player vs Player -->
            <div class="border-4 border-yellow-600 rounded-lg bg-opacity-10 p-6 cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105">
              <h2 class="arena-title text-center text-yellow-400 font-bold text-xl mb-4">Player vs Player</h2>
              <div class="players-grid flex flex-col gap-6 justify-center items-center">
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 1" class="max-w-full h-auto object-cover mx-auto rounded" />
                  Nombre jugador 1
                </div>
                <img src="${vs}" alt="VS" class="vs-image w-40 h-12 object-contain" />
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 2" class="max-w-full h-auto object-cover mx-auto rounded" />
                  Nombre jugador 2
                </div>
              </div>
            </div>

            <!-- Player vs CPU -->
            <div class="border-4 border-red-600 rounded-xl bg-opacity-10 p-6 cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105">
              <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-red-400">Player vs CPU</h3>
              <div class="players-grid flex flex-col gap-6 justify-center items-center">
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 1" class="max-w-full h-auto object-cover mx-auto rounded" />
                  Nombre jugador 1
                </div>
                <img src="${vs}" alt="VS" class="vs-image w-40 h-12 object-contain" />
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 2" class="max-w-full h-auto object-cover mx-auto rounded" />
                  Nombre jugador 2
                </div>
              </div>
            </div>

            <!-- CPU vs CPU -->
            <div class="border-4 border-blue-600 rounded-xl bg-opacity-10 p-6 cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105">
              <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-blue-400">CPU vs CPU</h3>
              <div class="players-grid flex flex-col gap-6 justify-center items-center">
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 1" class="max-w-full h-auto object-cover mx-auto rounded" />
                  Nombre jugador 1
                </div>
                <img src="${vs}" alt="VS" class="vs-image w-40 h-12 object-contain" />
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 2" class="max-w-full h-auto object-cover mx-auto rounded" />
                  Nombre jugador 2
                </div>
              </div>
            </div>
          </div>`
    }
}
customElements.define("app-arenas", AppArenas);