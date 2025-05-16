import logo from '../assets/logomk.png';

export class AppMain extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.setupEventListeners();
    }

    getHomeContent() {
        return `
            <section class="sect1 min-h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-center pb-1 sm:pb-10 gap-3 text-center">
                <div class="logo1 transform hover:scale-105 transition-transform duration-300 w-full flex justify-center">
                    <img id="mainLogo" src="${logo}" alt="logo mortal kombat" class="w-30 sm:w-50 md:w-60 lg:w-[350px] h-auto drop-shadow-2xl transition-transform duration-700 mx-auto">
                </div>
                <div class="contenido clip-path-custom -skew-x-12 overflow-hidden p-4 sm:p-6 md:p-4 w-full sm:w-4/5 md:w-[60%] lg:w-[35%] h-30 bg-gradient-to-b from-[#f4e179] via-[#c1972a] to-[#a26808] border-[0.5em] border-[#c1972a] ">
                    <div class="relative">
                        <h3 class="text-xl md:text-2xl lg:text-3xl text-white mt-2 font-bold drop-shadow-lg"><span id="typewriter"></span></h3>
                        <p class="text-base md:text-lg lg:text-xl text-gray-200 mt-2 drop-shadow-md">Sangre, Honor y Batalla sin Fin</p>
                    </div>
                </div>
            </section>
        `;
    }

    render() {
        this.innerHTML = `
            <div class="relative w-full min-h-screen">
                <div id="welcome-view" class="transition-opacity duration-500 opacity-100 flex items-center justify-center">
                    <app-welcome></app-welcome>
                </div>
                <div id="main-view" class="hidden transition-opacity duration-500 opacity-0">
                    <app-nav class="fixed top-0 left-0 w-full z-50 pr-20"></app-nav>
                    <div id="content-view" class="mx-auto w-full max-w-full sm:max-w-4xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl
                        px-2 sm:px-6 md:px-10 lg:px-16 xl:px-20
                        py-1 sm:py-2 md:py-4
                        transition-opacity duration-500 opacity-100 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                        ${this.getHomeContent()}
                    </div>
                </div>
            </div>
        `;
        this.typewriterEffect('Empieza el reinado del kaos');
        this.setupLogoSpin();
    }

    setupEventListeners() {
        const welcome = this.querySelector('app-welcome');
        welcome.addEventListener('welcomeComplete', () => {
            const welcomeView = this.querySelector('#welcome-view');
            const mainView = this.querySelector('#main-view');
            this.fadeOut(welcomeView, () => {
                this.fadeIn(mainView);
            });
        });

        const nav = this.querySelector('app-nav');
        nav.addEventListener('navClick', (e) => {
            const contentView = this.querySelector('#content-view');
            const section = e.detail.section;
            this.fadeOut(contentView, () => {
                if (section === 'dlc') {
                    contentView.innerHTML = '<app-dlc></app-dlc>';
                } else if (section === 'arena') {
                    contentView.innerHTML = '<app-arenas></app-arenas>';
                } else if (section === 'cameos') {
                    contentView.innerHTML = '<app-cameos></app-cameos>';
                } else if (section === 'home') {
                    contentView.innerHTML = this.getHomeContent();
                    this.typewriterEffect('Empieza el reinado del kaos');
                    this.setupLogoSpin();
                }
                this.fadeIn(contentView);
            });
        });

        // Add event listener for game mode selection
        document.addEventListener('gameModeSelected', (e) => {
            const contentView = this.querySelector('#content-view');
            const gameMode = e.detail.mode;
            this.fadeOut(contentView, () => {
                contentView.innerHTML = `<app-selector game-mode="${gameMode}"></app-selector>`;
                this.fadeIn(contentView);
            });
        });

        // Add event listener for view change (including fight view)
        document.addEventListener('viewChange', (e) => {
            const contentView = this.querySelector('#content-view');
            const view = e.detail.view;
            const data = e.detail.data;

            this.fadeOut(contentView, () => {
                if (view === 'fight') {
                    contentView.innerHTML = '<app-fight></app-fight>';
                    // Esperar a que el componente se monte antes de enviar los datos
                    setTimeout(() => {
                        document.dispatchEvent(new CustomEvent('startFight', {
                            detail: data
                        }));
                    }, 0);
                }
                this.fadeIn(contentView);
            });
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

    fadeIn(element) {
        element.classList.remove('hidden');
        setTimeout(() => {
            element.classList.add('opacity-100');
            element.classList.remove('opacity-0');
        }, 500);
    }

    fadeOut(element, callback) {
        element.classList.remove('opacity-100');
        element.classList.add('opacity-0');
        setTimeout(() => {
            element.classList.add('hidden');
            if (callback) callback();
        }, 500);
    }

    setupLogoSpin() {
        const logoImg = this.querySelector('#mainLogo');
        if (!logoImg) return;
        logoImg.addEventListener('click', () => {
            logoImg.classList.add('spin-coin');
            logoImg.addEventListener('animationend', () => {
                logoImg.classList.remove('spin-coin');
            }, { once: true });
        });
    }
}

customElements.define("app-main", AppMain);

// Agrega el estilo para la animación
const style = document.createElement('style');
style.textContent = `
.spin-coin {
    animation: spinY 2s cubic-bezier(0.4, 0.2, 0.2, 1);
}
@keyframes spinY {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(720deg); }
}
`;
document.head.appendChild(style);

// Agrega las fuentes Bebas Neue y Montserrat al head si no están ya
if (!document.getElementById('bebas-montserrat-fonts')) {
    const link = document.createElement('link');
    link.id = 'bebas-montserrat-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap';
    document.head.appendChild(link);
}
// Aplica las fuentes globalmente
const fontStyle = document.createElement('style');
fontStyle.textContent = `
  body, html, #app, .font-sans, .font-family-main {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif !important;
    letter-spacing: 0.01em;
  }
  h1, h2, h3, .font-title {
    font-family: 'Bebas Neue', Arial, Helvetica, sans-serif !important;
    letter-spacing: 0.04em;
  }
`;
document.head.appendChild(fontStyle);