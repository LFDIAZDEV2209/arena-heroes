// import logoLetras from '../assets/logoletrasmk.png';
// import  logo from '../assets/logomk.png';

// export class AppWelcome extends HTMLElement{
//     constructor(){
//         super();
//         this.render();
//     }
//     async render() {
//         this.innerHTML = `
//            <style rel="stylesheet">
//               @import "./pruebas.css";
//           </style>
//           <div class="welcomehome">
//               <section class="sect1">
//               <div class="logo1">
//                 <img src="${logo}" alt="logo mortal kombat">
//               </div>
//               // <div class="logo2">
//               //   <img src="${logoLetras}" alt="letras mortal kombat">
//               // </div>
//               <div class="contenido">
//                 <h3>Empieza el reinado del caos</h3>
//                 <p>Sangre, Honor y Batalla sin Fin</p>
//               </div>
//             </section>
//             <section class="sect2">
//               <div class="videoclip">
//                 <iframe 
//                   width="560" 
//                   height="315" 
//                   src="https://www.youtube.com/embed/ds5tCfZAJuM" 
//                   title="YouTube video player" 
//                   frameborder="0" 
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                   allowfullscreen>
//                 </iframe>
//               </div>
//               <div class="contenido2">
//                 <p>MORTAL KOMBAT</p>
//               </div>
//               <div class="btninit">
//                 <a href="#" id="btnPlay" >JUGAR AHORA</a>
//               </div>
//             </section>
//           </div>
//         `;
//         const btnPlay = this.querySelector("#btnPlay");
//         const sect1 = this.querySelector(".sect1");
//         const sect2 = this.querySelector(".sect2");
    
//         btnPlay.addEventListener("click", (event) => {
//           event.preventDefault();
//           sect2.style.display = "none";
//           sect1.style.display = "flex";
//         });
//       }
//     }
    
//     customElements.define("app-welcome", AppWelcome);

import logoLetras from '../assets/logoletrasmk.png';
import logo from '../assets/logomk.png';

export class AppWelcome extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="welcomehome relative w-screen h-screen p-5 font-sans text-white bg-cover bg-center bg-no-repeat" style="background-image: url('https://www.mksecrets.net/images/mk9/arena07.png');">
        <section class="sect1 absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center gap-5 text-center">
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
        <section class="sect2 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center gap-5 text-center shadow-[0_0_30px_rgba(0,0,0,0.7)] z-10 transition-opacity ease-in duration-500">
          <div class="videoclip w-1/2 h-[60%] flex items-center justify-center p-4 mx-auto">
            <iframe 
              class="w-[80%] h-full border-2 border-red-600 rounded-lg"
              src="https://www.youtube.com/embed/ds5tCfZAJuM" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="contenido2">
            <p class="text-2xl font-bold text-red-600">MORTAL KOMBAT</p>
          </div>
          <div class="btninit">
            <a href="#" id="btnPlay" class="inline-block bg-red-600 text-white no-underline px-6 py-3 text-lg rounded-md transition-colors duration-300 hover:bg-red-800">
              JUGAR AHORA
            </a>
          </div>
        </section>
      </div>
    `;

    const btnPlay = this.querySelector("#btnPlay");
    const sect1 = this.querySelector(".sect1");
    const sect2 = this.querySelector(".sect2");

    btnPlay.addEventListener("click", (event) => {
      event.preventDefault();
      sect2.classList.add("hidden");
      sect1.classList.remove("hidden");
    });
  }
}

customElements.define("app-welcome", AppWelcome);