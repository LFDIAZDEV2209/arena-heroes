function playSoundtrack() {
    const soundtrack = document.getElementById("soundtrack");
    if (soundtrack) {
        soundtrack.volume = 0.5; // Set the volume to 50%
        soundtrack.play().catch((error) => {
            console.log("Error en el sonido de fondo:", error);
        });
    }
};


function playSoundSelectionSelector() {
    const selectionSelector = document.getElementById("soundtrack");
    if (selectionSelector) {
        this.playSoundtrack(false);
        selectionSelector.volume = 0.5; // Set the volume to 50%
        selectionSelector.play().catch((error) => {
            console.log("Error en el sonido de selección:", error);
        });
    }
}

document.addEventListener("click", function onFirstClick() {
    playSoundtrack();
    playSoundSelectionSelector();
    document.removeEventListener("click", onFirstClick);
})
