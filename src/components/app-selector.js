import { getCharacters } from '../services//characterServices.js';

const user1 = 'userSelect';
const user2 = 'userSelect2';

export class AppSelector extends HTMLElement {
    constructor() {
        super();
        this.gameMode = 'pvp';
        this.selectedCharacters = {
            player1: null,
            player2: null
        };
        this.confirmedSelections = {
            player1: false,
            player2: false
        };
        this.currentSelectingPlayer = 1;
        this.render();
    }

    static get observedAttributes() {
        return ['game-mode'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'game-mode') {
            this.gameMode = newValue;
            this.selectedCharacters = {
                player1: null,
                player2: null
            };
            this.confirmedSelections = {
                player1: false,
                player2: false
            };
            this.currentSelectingPlayer = 1;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.addEventListener('click', (e) => {
            const character = e.target.closest('.character-selected');
            const confirmButton = e.target.closest('.confirm-selection');
            const randomButton = e.target.closest('.random-selection');
            
            if (character && (this.gameMode === 'pvp' || this.gameMode === 'pvc')) {
                if (this.currentSelectingPlayer === 1 && !this.confirmedSelections.player1) {
                    this.selectCharacter(character, 1);
                } else if (this.currentSelectingPlayer === 2 && !this.confirmedSelections.player2 && this.gameMode === 'pvp') {
                    this.selectCharacter(character, 2);
                }
            } else if (confirmButton) {
                const playerNumber = parseInt(confirmButton.getAttribute('data-player'));
                this.confirmSelection(playerNumber);
            } else if (randomButton) {
                const playerNumber = parseInt(randomButton.getAttribute('data-player'));
                this.selectRandomCharacter(playerNumber);
            }
        });
    }

    selectCharacter(character, playerNumber) {
        const characterId = character.getAttribute('data-id');
        const characterName = character.getAttribute('data-name');
        const characterImage = character.getAttribute('data-image');
        const characterStrength = character.getAttribute('data-strength');
        const characterAttack = character.getAttribute('data-attack');
        const characterDamage = character.getAttribute('data-damage');
        const characterWeakness = character.getAttribute('data-weakness');

        this.selectedCharacters[`player${playerNumber}`] = {
            id: characterId,
            name: characterName,
            image: characterImage,
            abilities: {
                strength: characterStrength,
                attack: characterAttack,
                damage: characterDamage,
                weakness: characterWeakness
            }
        };
        this.updatePlayerCard(playerNumber);
    }

    async selectCPUCharacter() {
        const characterSelector = await getCharacters();
        // Selecciona un personaje aleatorio que no sea el mismo que el jugador
        const availableCharacters = characterSelector.filter(char => 
            char.id !== this.selectedCharacters.player1.id
        );
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        const cpuCharacter = availableCharacters[randomIndex];

        this.selectedCharacters.player2 = {
            id: cpuCharacter.id,
            name: cpuCharacter.name,
            image: cpuCharacter.image,
            abilities: {
                strength: cpuCharacter.abilities.strength,
                attack: cpuCharacter.abilities.attack,
                damage: cpuCharacter.abilities.damage,
                weakness: cpuCharacter.abilities.weakness
            }
        };
        this.confirmedSelections.player2 = true;
        this.updatePlayerCard(2);
    }

    async confirmSelection(playerNumber) {
        if (playerNumber === 1) {
            this.confirmedSelections.player1 = true;
            if (this.gameMode === 'pvp') {
                this.currentSelectingPlayer = 2;
            } else if (this.gameMode === 'pvc') {
                // La CPU selecciona su personaje automáticamente
                await this.selectCPUCharacter();
                console.log('CPU ha seleccionado su personaje');
            }
        } else if (playerNumber === 2) {
            this.confirmedSelections.player2 = true;
            // Aquí puedes agregar la lógica para iniciar el juego
            console.log('Ambos jugadores han seleccionado sus personajes');
        }
        this.updatePlayerCard(playerNumber);
    }

    async selectRandomCharacter(playerNumber) {
        const characterSelector = await getCharacters();
        // Si es el jugador 2 y el jugador 1 ya tiene un personaje seleccionado, excluimos ese personaje
        const availableCharacters = playerNumber === 2 && this.selectedCharacters.player1 ? 
            characterSelector.filter(char => char.id !== this.selectedCharacters.player1.id) :
            characterSelector;
        
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        const randomCharacter = availableCharacters[randomIndex];

        this.selectedCharacters[`player${playerNumber}`] = {
            id: randomCharacter.id,
            name: randomCharacter.name,
            image: randomCharacter.image,
            abilities: {
                strength: randomCharacter.abilities.strength,
                attack: randomCharacter.abilities.attack,
                damage: randomCharacter.abilities.damage,
                weakness: randomCharacter.abilities.weakness
            }
        };
        this.updatePlayerCard(playerNumber);
    }

    updatePlayerCard(playerNumber) {
        const card = this.querySelector(`#userCard${playerNumber}`);
        if (card && this.selectedCharacters[`player${playerNumber}`]) {
            const character = this.selectedCharacters[`player${playerNumber}`];
            const cardContent = card.querySelector('.relative.z-10');
            cardContent.innerHTML = `
                <h3 class="w-full text-2xl text-yellow-500 mt-0">${character.name}</h3>
                <div class="flex flex-col gap-1 text-sm text-white mt-2">
                    <p class="flex items-center gap-2">
                        <span class="text-amber-400">⚔ Ataque:</span> 
                        <span class="text-red-400">${character.abilities.attack}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="text-amber-400">💥 Daño:</span> 
                        <span class="text-red-400">${character.abilities.damage}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="text-amber-400">🛡 Fuerza:</span> 
                        <span class="text-green-400">${character.abilities.strength}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="text-amber-400">⚠ Debilidad:</span> 
                        <span class="text-red-400">${character.abilities.weakness}</span>
                    </p>
                </div>
                ${(this.gameMode === 'pvp' || this.gameMode === 'pvc') && this.currentSelectingPlayer === playerNumber && !this.confirmedSelections[`player${playerNumber}`] ? 
                    `<button class="confirm-selection bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" data-player="${playerNumber}">
                        Confirmar Selección
                    </button>` : ''}
            `;
            card.style.backgroundImage = `url('${character.image}')`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }
    }

    getPlayerCard(playerNumber, isCPU = false) {
        const playerType = isCPU ? 'CPU' : `Player ${playerNumber}`;
        const selectedCharacter = this.selectedCharacters[`player${playerNumber}`];
        const isSelecting = this.currentSelectingPlayer === playerNumber && !this.confirmedSelections[`player${playerNumber}`];
        const showRandomButton = this.gameMode === 'cvc' || (this.gameMode === 'pvc' && playerNumber === 1) || (this.gameMode === 'pvp' && !this.confirmedSelections[`player${playerNumber}`]);
        
        return `
            <div id="userCard${playerNumber}" class="group relative w-[300px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${selectedCharacter ? selectedCharacter.image : (isCPU ? user2 : user1)}');"></div>
                <div class="relative z-10 p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                    <h3 class="w-full text-2xl text-yellow-500 mt-0">${selectedCharacter ? selectedCharacter.name : playerType}</h3>
                    <div class="flex flex-col gap-1 text-sm text-white mt-2">
                        ${selectedCharacter ? `
                            <p class="flex items-center gap-2">
                                <span class="text-amber-400">⚔ Ataque:</span> 
                                <span class="text-red-400">${selectedCharacter.abilities.attack}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <span class="text-amber-400">💥 Daño:</span> 
                                <span class="text-red-400">${selectedCharacter.abilities.damage}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <span class="text-amber-400">🛡 Fuerza:</span> 
                                <span class="text-green-400">${selectedCharacter.abilities.strength}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <span class="text-amber-400">⚠ Debilidad:</span> 
                                <span class="text-red-400">${selectedCharacter.abilities.weakness}</span>
                            </p>
                        ` : `
                            <p>⚔ </p>
                            <p>🛡 </p>
                            <p>💨 </p>
                            <p>🎯 </p>
                        `}
                        ${showRandomButton ? 
                            `<button class="random-selection bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" data-player="${playerNumber}">
                                Selección Aleatoria
                            </button>` : ''}
                        ${(this.gameMode === 'pvp' || this.gameMode === 'pvc') && isSelecting ? 
                            `<button class="confirm-selection bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300" data-player="${playerNumber}">
                                Confirmar Selección
                            </button>` : ''}
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
                                        <div class="character-selected bg-gray-700 opacity-85 border-1 border-amber-400 border-solid shadow-md rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer" 
                                             data-id="${character.id}"
                                             data-name="${character.name}"
                                             data-image="${character.image}"
                                             data-strength="${character.abilities.strength}"
                                             data-attack="${character.abilities.attack}"
                                             data-damage="${character.abilities.damage}"
                                             data-weakness="${character.abilities.weakness}">
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