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
            console.log('Selector received game mode:', newValue);
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
            
            // Si es modo CPU vs CPU, seleccionar personajes automáticamente
            if (this.gameMode === 'cvc') {
                console.log('Starting CPU vs CPU mode');
                this.handleCPUvsCPU();
            }
        }
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Delegación global para asegurar que los botones funcionen en cualquier estructura
        document.addEventListener('click', (e) => {
            // Solo manejar eventos si el selector está visible
            if (!this.isConnected) return;
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
        try {
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
            console.log('CPU character selected:', this.selectedCharacters.player2);
        } catch (error) {
            console.error('Error selecting CPU character:', error);
        }
    }

    async confirmSelection(playerNumber) {
        if (playerNumber === 1) {
            this.confirmedSelections.player1 = true;
            if (this.gameMode === 'pvp') {
                this.currentSelectingPlayer = 2;
            } else if (this.gameMode === 'pvc') {
                // La CPU selecciona su personaje automáticamente
                await this.selectCPUCharacter();
                console.log('CPU ha seleccionado su personaje:', this.selectedCharacters.player2);
                // Redirigir a la vista de lucha después de que la CPU seleccione
                this.redirectToFight();
            }
        } else if (playerNumber === 2) {
            this.confirmedSelections.player2 = true;
            // Redirigir a la vista de lucha cuando el jugador 2 confirma
            this.redirectToFight();
        }
        this.updatePlayerCard(playerNumber);
    }

    redirectToFight() {
        console.log('Redirecting to fight with game mode:', this.gameMode);
        // Crear un evento personalizado con los datos de los personajes seleccionados
        const fightEvent = new CustomEvent('startFight', {
            detail: {
                player1: this.selectedCharacters.player1,
                player2: this.selectedCharacters.player2,
                gameMode: this.gameMode
            }
        });
        
        // Crear un evento para cambiar la vista
        const viewChangeEvent = new CustomEvent('viewChange', {
            detail: {
                view: 'fight',
                data: {
                    player1: this.selectedCharacters.player1,
                    player2: this.selectedCharacters.player2,
                    gameMode: this.gameMode
                }
            }
        });
        
        // Despachar los eventos
        document.dispatchEvent(fightEvent);
        document.dispatchEvent(viewChangeEvent);
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

    async handleCPUvsCPU() {
        const characterSelector = await getCharacters();
        
        // Seleccionar personaje para CPU 1
        const randomIndex1 = Math.floor(Math.random() * characterSelector.length);
        const cpu1Character = characterSelector[randomIndex1];
        
        this.selectedCharacters.player1 = {
            id: cpu1Character.id,
            name: cpu1Character.name,
            image: cpu1Character.image,
            abilities: {
                strength: cpu1Character.abilities.strength,
                attack: cpu1Character.abilities.attack,
                damage: cpu1Character.abilities.damage,
                weakness: cpu1Character.abilities.weakness
            }
        };
        this.confirmedSelections.player1 = true;
        
        // Seleccionar personaje para CPU 2 (diferente al de CPU 1)
        const availableCharacters = characterSelector.filter(char => char.id !== cpu1Character.id);
        const randomIndex2 = Math.floor(Math.random() * availableCharacters.length);
        const cpu2Character = availableCharacters[randomIndex2];
        
        this.selectedCharacters.player2 = {
            id: cpu2Character.id,
            name: cpu2Character.name,
            image: cpu2Character.image,
            abilities: {
                strength: cpu2Character.abilities.strength,
                attack: cpu2Character.abilities.attack,
                damage: cpu2Character.abilities.damage,
                weakness: cpu2Character.abilities.weakness
            }
        };
        this.confirmedSelections.player2 = true;
        
        // Redirigir inmediatamente a la vista de lucha
        this.redirectToFight();
    }

    updatePlayerCard(playerNumber) {
        const card = this.querySelector(`#userCard${playerNumber}`);
        if (card && this.selectedCharacters[`player${playerNumber}`]) {
            const character = this.selectedCharacters[`player${playerNumber}`];
            const cardContent = card.querySelector('.relative.z-10');
            cardContent.innerHTML = `
                <h3 class="w-full text-xs sm:text-2xl text-yellow-500 mt-0 text-center">${character.name}</h3>
                <div class="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-sm text-white mt-2 sm:mt-4 w-full">
                    <p class="flex items-center gap-1 sm:gap-2">
                        <span class="text-amber-400">⚔</span> 
                        <span class="text-red-400">${character.abilities.attack}</span>
                    </p>
                    <p class="flex items-center gap-1 sm:gap-2">
                        <span class="text-amber-400">💥</span> 
                        <span class="text-red-400">${character.abilities.damage}</span>
                    </p>
                    <p class="flex items-center gap-1 sm:gap-2">
                        <span class="text-amber-400">🛡</span> 
                        <span class="text-green-400">${character.abilities.strength}</span>
                    </p>
                    <p class="flex items-center gap-1 sm:gap-2">
                        <span class="text-amber-400">⚠</span> 
                        <span class="text-red-400">${character.abilities.weakness}</span>
                    </p>
                    ${(this.gameMode === 'pvp' || this.gameMode === 'pvc') && this.currentSelectingPlayer === playerNumber && !this.confirmedSelections[`player${playerNumber}`] ? 
                        `<div class="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-6 w-full px-1 sm:px-2">
                            <button class="confirm-selection bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-[10px] sm:text-base transition-colors duration-300 w-full" data-player="${playerNumber}">
                                Confirmar
                            </button>
                        </div>` : ''}
                </div>
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
            <div id="userCard${playerNumber}" class="group relative w-[120px] h-[250px] sm:w-[300px] sm:h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden skew-y-[-3deg] bg-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col justify-start">
                <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style="background-image: url('${selectedCharacter ? selectedCharacter.image : (isCPU ? user2 : user1)}');"></div>
                <div class="relative z-10 p-2 sm:p-4 bg-black/10 h-full w-[90%] flex flex-col justify-between items-center rounded-lg">
                    <h3 class="w-full text-xs sm:text-2xl text-yellow-500 mt-0 text-center">${selectedCharacter ? selectedCharacter.name : playerType}</h3>
                    <div class="flex flex-col gap-1 sm:gap-2 text-[10px] sm:text-sm text-white mt-2 sm:mt-4 w-full">
                        ${selectedCharacter ? `
                            <p class="flex items-center gap-1 sm:gap-2">
                                <span class="text-amber-400">⚔</span> 
                                <span class="text-red-400">${selectedCharacter.abilities.attack}</span>
                            </p>
                            <p class="flex items-center gap-1 sm:gap-2">
                                <span class="text-amber-400">💥</span> 
                                <span class="text-red-400">${selectedCharacter.abilities.damage}</span>
                            </p>
                            <p class="flex items-center gap-1 sm:gap-2">
                                <span class="text-amber-400">🛡</span> 
                                <span class="text-green-400">${selectedCharacter.abilities.strength}</span>
                            </p>
                            <p class="flex items-center gap-1 sm:gap-2">
                                <span class="text-amber-400">⚠</span> 
                                <span class="text-red-400">${selectedCharacter.abilities.weakness}</span>
                            </p>
                        ` : `

                        `}
                        <div class="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-6 w-full px-1 sm:px-2">
                            ${showRandomButton ? 
                                `<button class="random-selection bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-[10px] sm:text-base transition-colors duration-300 w-full" data-player="${playerNumber}">
                                    Aleatorio
                                </button>` : ''}
                            ${(this.gameMode === 'pvp' || this.gameMode === 'pvc') && isSelecting ? 
                                `<button class="confirm-selection bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-[10px] sm:text-base transition-colors duration-300 w-full" data-player="${playerNumber}">
                                    Confirmar
                                </button>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async render() {
        // Asegúrate de tener <meta name="viewport" content="width=device-width, initial-scale=1"> en tu index.html
        const characterSelector = await getCharacters(); 
        this.innerHTML = `
            <div class="w-auto h-screen flex flex-col items-center justify-center">
                <div class="flex flex-col sm:flex-row items-center justify-center w-full sm:w-4/5 mx-auto m-2 sm:m-4 gap-2 sm:gap-5 pr-2 sm:pr-3">
                    ${this.getPlayerCard(1, this.gameMode === 'cvc')}
                    <!-- VS -->
                    <div class="flex items-center justify-center">
                        <div id="selector">
                            <div class="grid grid-cols-4 sm:grid-cols-6 gap-0.5 sm:gap-2 justify-items-center mt-2 sm:mt-10">
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
                                            <img src="${character.imageSMALL}" alt="${character.name}" class="w-8 h-8 sm:w-20 sm:h-20" />
                                        </div>
                                    `;
                                }).join('')}
                            </div>   
                        </div>
                    </div>    
                    ${this.getPlayerCard(2, this.gameMode === 'cvc' || this.gameMode === 'pvc')}
                </div>
            </div>
        `;
        this.setupEventListeners();
    }
}
customElements.define('app-selector', AppSelector)