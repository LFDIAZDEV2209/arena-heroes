import { getCharactersByType } from '../services/characterServices.js';

export class AppCameos extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    const characterCameos = await getCharactersByType("base");
    this.innerHTML = `
        <div class="container mx-auto px-14 p-5">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    ${characterCameos.map((character, idx) => {
                        return `
                        <div class="w-70 max-w-sm border-2 border-gray-300 shadow-xl -skew-x-12 [perspective:1000px] bg-gray-300">
                            <div class="relative w-full h-[400px] transition-transform duration-500 card-inner-${idx}" style="transform-style: preserve-3d;">
                                <!-- Cara frontal -->
                                <div class="absolute inset-0 backface-hidden flex flex-col items-center py-10 z-10">
                                    <img src="${character.image}" alt="${character.name}" class="object-cover skew-x-10 w-40 h-56 mx-auto rounded transition-transform duration-300 hover:scale-120" />
                                    <button class="bg-yellow-300 text-black font-semibold rounded px-8 py-1 mt-4 mx-auto block btn-view" data-idx="${idx}">Info</button>
                                </div>
                                <!-- Cara trasera limpia -->
                                <div class="absolute inset-0 backface-hidden shadow-xl flex items-center justify-center rotate-y-180 z-20">
                                    <div class="w-full h-full flex flex-col items-center justify-center gap-2 py-10">
                                        <img src="${character.image}" alt="${character.name}" class=" skew-x-10 w-30 h-46 opacity-30" />
                                        <h3 class="text-2xl font-bold">
                                            ${character.name}
                                        </h3>
                                        <p class="text-sm font-semibold text-gray-500">
                                            ${character.alias}
                                        </p>
                                        <p class="text-sm px-4">
                                            ${character.description}
                                        </p>
                                        <p class="text-sm">
                                            Trajes: ${character.suits.join(', ')}
                                        </p>
                                        <button class="btn-back bg-red-200 text-black font-semibold rounded px-8 py-1 mt-4 mx-auto block " data-idx="${idx}">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    }).join('')}
                </div>
            </div>
        `;
                this.addFlipEvents();
            }
            addFlipEvents() {
                this.querySelectorAll('.btn-view').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.target.getAttribute('data-idx');
                        const card = this.querySelector(`.card-inner-${idx}`);
                        if (card) {
                            card.classList.add('rotate-y-180');
                        }
                    });
                });

                this.querySelectorAll('.btn-back').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.target.getAttribute('data-idx');
                        const card = this.querySelector(`.card-inner-${idx}`);
                        if (card) {
                            card.classList.remove('rotate-y-180');
                        }
                    });
                });
            }

}
customElements.define('app-cameos', AppCameos);