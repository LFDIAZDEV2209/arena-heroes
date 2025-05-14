import logo from '../assets/logomk.png';

export class AppMain extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="relative w-full min-h-screen bg-cover bg-center bg-no-repeat" style="background-image: url('https://www.mksecrets.net/images/mk9/arena07.png');">
                <div id="welcome-view">
                    <app-welcome></app-welcome>
                </div>
                <div id="main-view" class="hidden">
                    <app-nav class="fixed top-0 left-0 w-full z-50 pr-20"></app-nav>
                    <div id="content-view" class="pt-25 px-4 md:px-8 lg:px-16">
                        <section class="sect1 min-h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-start pb-30 gap-3 text-center">
                            <div class="logo1 transform hover:scale-105 transition-transform duration-300">
                                <img src="${logo}" alt="logo mortal kombat" class="max-w-[300px] md:max-w-[400px] lg:max-w-[600px] h-auto drop-shadow-2xl">
                            </div>
                            <div class="contenido clip-path-custom -skew-x-12 overflow-hidden p-6 md:p-8 w-full md:w-[45%] lg:w-[35%] h-auto bg-gradient-to-b from-[#f4e179] via-[#c1972a] to-[#a26808] border-[0.5em] border-[#c1972a] transform hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <div class="relative">
                                    <h3 class="text-xl md:text-2xl lg:text-3xl text-white mt-2 font-bold drop-shadow-lg"><span id="typewriter"></span></h3>
                                    <p class="text-base md:text-lg lg:text-xl text-gray-200 mt-2 drop-shadow-md">Sangre, Honor y Batalla sin Fin</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `;
        this.typewriterEffect('Empieza el reinado del caos');
    }

    setupEventListeners() {
        const welcome = this.querySelector('app-welcome');
        welcome.addEventListener('welcomeComplete', () => {
            const welcomeView = this.querySelector('#welcome-view');
            const mainView = this.querySelector('#main-view');
            
            welcomeView.classList.add('hidden');
            mainView.classList.remove('hidden');
        });

        const nav = this.querySelector('app-nav');
        nav.addEventListener('navClick', (e) => {
            const contentView = this.querySelector('#content-view');
            const section = e.detail.section;
            
            if (section === 'dlc') {
                contentView.innerHTML = '<app-dlc></app-dlc>';
            } else if (section === 'arena') {
                contentView.innerHTML = '<app-arenas></app-arenas>';
            } else if (section === 'home') {
                contentView.innerHTML = `
                    <section class="sect1 min-h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-start pb-30 gap-3 text-center">
                        <div class="logo1 transform hover:scale-105 transition-transform duration-300">
                            <img src="${logo}" alt="logo mortal kombat" class="max-w-[300px] md:max-w-[400px] lg:max-w-[600px] h-auto drop-shadow-2xl">
                        </div>
                        <div class="contenido clip-path-custom skew-x-[-12deg] overflow-hidden p-6 md:p-8 w-full md:w-[45%] lg:w-[35%] h-auto bg-gradient-to-b from-[#f4e179] via-[#c1972a] to-[#a26808] border-[0.5em] border-[#c1972a] transform hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <div class="relative">
                                <h3 class="text-xl md:text-2xl lg:text-3xl text-white mt-2 font-bold drop-shadow-lg"><span id="typewriter"></span></h3>
                                <p class="text-base md:text-lg lg:text-xl text-gray-200 mt-2 drop-shadow-md">Sangre, Honor y Batalla sin Fin</p>
                            </div>
                        </div>
                    </section>
                `;
                this.typewriterEffect('Empieza el reinado del caos');
            }
        });
    }

    typewriterEffect(text) {
        const el = this.querySelector('#typewriter');
        if (!el) return;
        el.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 200);
    }
}

customElements.define("app-main", AppMain);
