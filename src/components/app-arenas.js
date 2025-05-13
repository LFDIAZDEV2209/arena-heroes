export class AppArenas extends HTMLElement{
    constructor(){
        super();

        this.render();
    }
    render(){
        this.innerHTML=`
        <div class="containerArenas mx-auto px-14 p-32">
            <div class="flex justify-around">
                <div class="grid grid-cols-3 gap-15 justify-items-center w-115 h-75 transition-transform duration-300 hover:scale-105">
                    <div class="w-50 max-w-sm bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-10 ml-30">
                        <img src="../img/logoBLACK.png" alt="logo en negro" class="object-cover w-40 h-46 opacity-81 mx-auto rounded "/>
                        <h2 class="text-xl font-bold">Player</h2>
                    </div>
                    <img src="../img/vsLOGO.png" alt="logo en negro" class="object-cover w-35 h-33 opacity-95 mx-auto rounded z-60 mt-20"/>
                    <div class="w-50 max-w-sm bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-10 mr-30">
                        <img src="../img/logoBLACK.png" alt="logo en negro" class="object-cover w-40 h-46 opacity-81 mx-auto rounded"/>
                        <h2 class="text-xl font-bold">Player</h2>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-15 justify-items-center w-115 h-75 transition-transform duration-300 hover:scale-105">
                    <div class="w-50 max-w-sm bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-10 ml-30">
                        <img src="../img/logoBLACK.png" alt="logo en negro" class="object-cover w-40 h-46 opacity-81 mx-auto rounded "/>
                        <h2 class="text-xl font-bold">Player</h2>
                    </div>
                    <img src="../img/vsLOGO.png" alt="logo en negro" class="object-cover w-35 h-33 opacity-95 mx-auto rounded z-60 mt-20"/>
                    <div class="w-50 max-w-sm bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-10 mr-30">
                        <img src="../img/logoBLACK.png" alt="logo en negro" class="object-cover w-40 h-46 opacity-81 mx-auto rounded"/>
                        <h2 class="text-xl font-bold">CPU</h2>
                    </div>
                </div>
            </div>
            <div class="flex justify-center pt-16"
                <div>
                    <div class="grid grid-cols-3 gap-15 justify-items-center w-115 h-75 transition-transform duration-300 hover:scale-105">
                        <div class="w-50 max-w-sm bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-10 ml-30">
                            <img src="../img/logoBLACK.png" alt="logo en negro" class="object-cover w-40 h-46 opacity-81 mx-auto rounded "/>
                            <h2 class="text-xl font-bold">CPU</h2>
                        </div>
                        <img src="../img/vsLOGO.png" alt="logo en negro" class="object-cover w-35 h-33 opacity-95 mx-auto rounded z-60 mt-20"/>
                        <div class="w-50 max-w-sm bg-gray-100 border-2 border-gray-300 shadow-xl -skew-y-3 flex flex-col items-center py-10 mr-30">
                            <img src="../img/logoBLACK.png" alt="logo en negro" class="object-cover w-40 h-46 opacity-81 mx-auto rounded"/>
                            <h2 class="text-xl font-bold">CPU</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
}
customElements.define("app-arenas", AppArenas);