import logoLetras from '../assets/logoletrasmk.png';
import logo from '../assets/logomk.png';
import videoMain from '../assets/video-main.mp4';

class AppWelcome extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="welcomehome fixed inset-0 w-full h-full p-2 sm:p-5 font-sans text-white;">
        <section class="sect1 flex flex-col items-center justify-center  absolute inset-0 w-full h-full  gap-3 sm:gap-5 text-center">
          <div class="logo1 flex justify-center w-full">
            <img src="${logo}" alt="logo mortal kombat" class=" md:max-w-[600px]  mx-auto x-auto w-32 sm:w-48 md:w-60 lg:w-[350px] h-auto drop-shadow-2xl transition-transform duration-700 hover:scale-110">
          </div>
          <div class="logo2 hidden">
            <img src="${logoLetras}" alt="letras mortal kombat" class="w-40 sm:w-80 md:max-w-[600px] h-auto mx-auto">
          </div>
        </section>
        <section class="sect2 absolute inset-0 w-full h-full bg-slate-950 bg-opacity-10 flex flex-col items-center justify-center gap-3 sm:gap-5 text-center shadow-[0_0_30px_rgba(0,0,0,0.7)] z-[5] transition-opacity ease-in duration-500">
          <div class="videoclip w-full sm:w-2/3 md:w-1/2 h-[40vh] sm:h-[60%] flex items-center justify-center p-2 sm:p-4 mx-auto">
          <video 
            class="w-full h-full object-cover rounded-lg shadow-[0_0_100px_rgba(255,165,0,0.5)] hover:shadow-[0_0_30px_rgba(255,165,0,0.7)] transition-all duration-300"
            autoplay  
            loop
            playsinline
            src="${videoMain}"
          >
            <source src="${videoMain}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
          </video>
          </div>
          <div class="contenido2">
            <p class="text-white text-xl sm:text-2xl font-bold ">MORTAL KOMBAT</p>
            <div class="mx-auto mt-2 w-20 sm:w-32 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 rounded-full shadow-[0_0_10px_4px_rgba(255,165,0,0.5)]"></div>
          </div>
          <div class="btninit">
            <button id="btnPlay" class="cursor-pointer inline-block bg-red-600 text-white no-underline px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl rounded-md transition-all duration-300 hover:bg-red-800 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-1">
              JUGAR AHORA
            </button>
          </div>
        </section>
      </div>
    `;

    const btnPlay = this.querySelector("#btnPlay");
    const video = this.querySelector("video");
    const sect1 = this.querySelector(".sect1");
    const sect2 = this.querySelector(".sect2");

    btnPlay.addEventListener("click", () => {
      sect2.classList.add("hidden");
      sect1.classList.remove("hidden");
      video.pause();
      
      const event = new CustomEvent('welcomeComplete', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
  }
}

customElements.define("app-welcome", AppWelcome);