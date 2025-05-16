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
                console.log('PVP mode selected');
                document.dispatchEvent(new CustomEvent('gameModeSelected', {
                    detail: { mode: 'pvp' }
                }));
            } else if (pvcSection) {
                console.log('PVC mode selected');
                document.dispatchEvent(new CustomEvent('gameModeSelected', {
                    detail: { mode: 'pvc' }
                }));
            } else if (cvcSection) {
                console.log('CVC mode selected');
                document.dispatchEvent(new CustomEvent('gameModeSelected', {
                    detail: { mode: 'cvc' }
                }));
            }
        });
    }

    render(){
        this.innerHTML=`
          <div class="containerArenas invisible-scrollbar grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-5 max-w-[800px] mx-auto p-4 sm:p-8 md:p-16 overflow-auto lg:h-auto">
            <!-- Player vs Player -->
            <div class="border-4 border-yellow-600 rounded-lg bg-opacity-10 p-6 cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105">
              <h2 class="arena-title text-center text-white font-bold text-xl mb-4">Player vs Player</h2>
              <div class="players-grid flex flex-col gap-6 justify-center items-center">
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 1" class="max-w-full h-auto object-cover mx-auto rounded" />
                  <p class="font-extrabold">Jugador 1</p>
                </div>
                <img src="${vs}" alt="VS" class="vs-image w-40 h-12 object-contain" />
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 2" class="max-w-full h-auto object-cover mx-auto rounded" />
                  <p class="font-extrabold">Jugador 2</p>
                </div>
              </div>
            </div>

            <!-- Player vs CPU -->
            <div class="border-4 border-red-600 rounded-xl bg-opacity-10 p-6 cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105">
              <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-white">Player vs CPU</h3>
              <div class="players-grid flex flex-col gap-6 justify-center items-center">
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 1" class="max-w-full h-auto object-cover mx-auto rounded" />
                  <p class="font-extrabold">Jugador 1</p>
                </div>
                <img src="${vs}" alt="VS" class="vs-image w-40 h-12 object-contain" />
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 2" class="max-w-full h-auto object-cover mx-auto rounded" />
                  <p class="font-extrabold">CPU</p>
                </div>
              </div>
            </div>

            <!-- CPU vs CPU -->
            <div class="border-4 border-blue-600 rounded-xl bg-opacity-10 p-6 cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105">
              <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-white">CPU vs CPU</h3>
              <div class="players-grid flex flex-col gap-6 justify-center items-center">
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 1" class="max-w-full h-auto object-cover mx-auto rounded" />
                  <p class="font-extrabold">CPU 1</p>
                </div>
                <img src="${vs}" alt="VS" class="vs-image w-40 h-12 object-contain" />
                <div class="player-card bg-gray-200 border-2 border-gray-300 shadow-lg transform -skew-y-3 p-8 opacity-60 max-w-xs text-center">
                  <img src="${logo}" alt="Player 2" class="max-w-full h-auto object-cover mx-auto rounded" />
                  <p class="font-extrabold">CPU 2</p>
                </div>
              </div>
            </div>
          </div>
          <audio id="soundSectionSelector" loop>
            <source src="src/assets/audios/MortalKombat.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
          `
    }
    
}
customElements.define("app-arenas", AppArenas);