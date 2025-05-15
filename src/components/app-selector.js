import { getCharacters } from '../services//characterServices.js';

const user1 = 'userSelect';
const user2 = 'userSelect2';

export class AppSelector extends HTMLElement {
    constructor() {
        super();
        this.gameMode = 'pvp'; 
        this.render();
    }

    static get observedAttributes() {
        return ['game-mode'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'game-mode') {
            this.gameMode = newValue;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    getPlayerCard(playerNumber, isCPU = false) {
        const playerType = isCPU ? 'CPU' : `Player ${playerNumber}`;
        return `
            <div id="userCard${playerNumber}" class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${isCPU ? user2 : user1}');"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                    <h3 class="w-full text-2xl text-yellow-500 mt-0">${playerType}</h3>
                    <div class="hidden group-hover:flex flex-col gap-1 text-sm text-white mt-2">
                        <p>⚔ </p>
                        <p>🛡 </p>
                        <p>💨 </p>
                        <p>🎯 </p>
                        ${!isCPU ? `<button id="selectedCard${playerNumber}" class="bg-amber-300 rounded-xl">Select</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    async render() {
        const characterSelector = await getCharacters(); 
        this.innerHTML = `
            <div class="w-screen h-screen flex flex-col items-center justify-center">
                <div class="flex justify-center items-center flex-row w-4/5 mx-auto m-8 gap-5">
                    ${this.getPlayerCard(1, this.gameMode === 'cvc')}
                    
                    <!-- VS -->
                    <div class="flex items-center justify-center gap-5">
                        <div id="selector">
                            <div class="grid grid-cols-3 mt-10 gap-1 justify-items-center">
                                ${characterSelector.map(character => {
                                    return `        
                                        <div id="selector" class="bg-gray-700 opacity-85 border-1 border-amber-400 border-solid shadow-md rounded-lg hover:scale-110 transition-transform duration-300">
                                            <img src="${character.imageSMALL}" alt="${character.name}" class="w-20 h-20" />
                                        </div>
                                    `;
                                }).join('')}
                            </div>   
                        </div>
                    </div>    
                    
                    ${this.getPlayerCard(2, this.gameMode === 'pvc' || this.gameMode === 'cvc')}
                </div>
            </div>
        `;
    }
}
customElements.define('app-selector', AppSelector)