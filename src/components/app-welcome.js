import logoLetras from '../assets/logoletrasmk.png';
import logo from '../assets/logomk.png';

class AppWelcome extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="welcomehome fixed inset-0 w-full h-full p-5 font-sans text-white bg-cover bg-center bg-no-repeat" style="background-image: url('https://www.mksecrets.net/images/mk9/arena07.png');">
        <section class="sect1 absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-5 text-center">
          <div class="logo1">
            <img src="${logo}" alt="logo mortal kombat" class="max-w-[600px] h-auto">
          </div>
          <div class="logo2 hidden">
            <img src="${logoLetras}" alt="letras mortal kombat" class="max-w-[600px] h-auto">
          </div>
          <div class="contenido clip-path-custom overflow-hidden p-4 w-[35%] h-auto bg-gradient-to-b from-[#f4e179] via-[#c1972a] to-[#a26808] border-[0.5em] border-[#c1972a]">
            <h3 class="text-2xl text-red-600 mt-2">Empieza el reinado del caos</h3>
            <p class="text-lg text-gray-200">Sangre, Honor y Batalla sin Fin</p>
          </div>
        </section>
        <section class="sect2 absolute inset-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center gap-5 text-center shadow-[0_0_30px_rgba(0,0,0,0.7)] z-[5] transition-opacity ease-in duration-500">
          <div class="videoclip w-1/2 h-[60%] flex items-center justify-center p-4 mx-auto">
            <video 
              class="w-full h-full object-cover rounded-lg border-2 border-red-600"
              autoplay 
              muted 
              loop
              playsinline
            >
              <source src="" type="video/mp4">
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
          <div class="contenido2">
            <p class="text-2xl font-bold text-red-600">MORTAL KOMBAT</p>
          </div>
          <div class="btninit">
            <button id="btnPlay" class="inline-block bg-red-600 text-white no-underline px-8 py-4 text-xl rounded-md transition-all duration-300 hover:bg-red-800 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-1">
              JUGAR AHORA
            </button>
          </div>
        </section>
      </div>
    `;

    const btnPlay = this.querySelector("#btnPlay");
    const sect1 = this.querySelector(".sect1");
    const sect2 = this.querySelector(".sect2");

    btnPlay.addEventListener("click", () => {
      sect2.classList.add("hidden");
      sect1.classList.remove("hidden");
      
      const event = new CustomEvent('welcomeComplete', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
  }
}

customElements.define("app-welcome", AppWelcome);