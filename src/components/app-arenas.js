export class AppArenas extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML=`
        <div class="containerArenas mx-auto px-2 sm:px-6 md:px-14 p-2 sm:p-5">
            <div class="flex flex-col gap-8">
                <!-- Player vs Player -->
                <div class="border-4 border-yellow-600 rounded-xl bg-black/10 p-4 cursor-pointer transition-transform duration-300 hover:scale-105">
                  <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-yellow-400">Player vs Player</h3>
                  <div class="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center w-full">
                      <div class="w-full max-w-sm md:max-w-lg bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-6 sm:py-10 ml-0 md:ml-8 opacity-60">
                        <img src="../../public/img/logoBLACK.png" alt="logo mortal kombat" class="object-cover w-28 sm:w-40 h-32 sm:h-46 opacity-81 mx-auto rounded "/>
                        <h2 class="text-lg sm:text-xl font-bold">Player</h2>
                      </div>
                      <img src="../public/img/vsLOGO.png" alt="logo mortal kombat" class="object-cover w-16 sm:w-28 h-16 sm:h-33 opacity-95 mx-auto rounded z-60 mt-4 sm:mt-20"/>
                      <div class="w-full max-w-sm md:max-w-lg bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-6 sm:py-10 mr-0 md:mr-8 opacity-60">
                        <img src="../../public/img/logoBLACK.png" alt="logo mortal kombat" class="object-cover w-28 sm:w-40 h-32 sm:h-46 opacity-81 mx-auto rounded"/>
                        <h2 class="text-lg sm:text-xl font-bold">Player</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Player vs CPU -->
                <div class="border-4 border-red-600 rounded-xl bg-black/10 p-4 cursor-pointer transition-transform duration-300 hover:scale-105">
                  <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-red-400">Player vs CPU</h3>
                  <div class="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center w-full mt-0">
                      <div class="w-full max-w-sm md:max-w-lg bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-6 sm:py-10 ml-0 md:ml-8 opacity-60">
                        <img src="../../public/img/logoBLACK.png" alt="logo mortal kombat" class="object-cover w-28 sm:w-40 h-32 sm:h-46 opacity-81 mx-auto rounded "/>
                        <h2 class="text-lg sm:text-xl font-bold">Player</h2>
                      </div>
                      <img src="../public/img/vsLOGO.png" alt="logo mortal kombat" class="object-cover w-16 sm:w-28 h-16 sm:h-33 opacity-95 mx-auto rounded z-60 mt-4 sm:mt-20"/>
                      <div class="w-full max-w-sm md:max-w-lg bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-6 sm:py-10 mr-0 md:mr-8 opacity-60">
                        <img src="../../public/img/logoBLACK.png" alt="logo mortal kombat" class="object-cover w-28 sm:w-40 h-32 sm:h-46 opacity-81 mx-auto rounded"/>
                        <h2 class="text-lg sm:text-xl font-bold">CPU</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- CPU vs CPU -->
                <div class="border-4 border-blue-600 rounded-xl bg-black/10 p-4 cursor-pointer transition-transform duration-300 hover:scale-105">
                  <h3 class="text-center text-lg sm:text-xl font-bold mb-4 text-blue-400">CPU vs CPU</h3>
                  <div class="flex justify-center">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center w-full">
                      <div class="w-full max-w-sm md:max-w-lg bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-6 sm:py-10 ml-0 md:ml-8 opacity-60">
                        <img src="../../public/img/logoBLACK.png" alt="logo mortal kombat" class="object-cover w-28 sm:w-40 h-32 sm:h-46 opacity-81 mx-auto rounded "/>
                        <h2 class="text-lg sm:text-xl font-bold">CPU</h2>
                      </div>
                      <img src="../public/img/vsLOGO.png" alt="logo mortal kombat" class="object-cover w-16 sm:w-28 h-16 sm:h-33 opacity-95 mx-auto rounded z-60 mt-4 sm:mt-20"/>
                      <div class="w-full max-w-sm md:max-w-lg bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-6 sm:py-10 mr-0 md:mr-8 opacity-60">
                        <img src="../../public/img/logoBLACK.png" alt="logo mortal kombat" class="object-cover w-28 sm:w-40 h-32 sm:h-46 opacity-81 mx-auto rounded"/>
                        <h2 class="text-lg sm:text-xl font-bold">CPU</h2>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>`
    }
}
customElements.define("app-arenas", AppArenas);