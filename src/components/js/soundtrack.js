function createAudioElement() {
    // Check if audio element already exists
    let audioElement = document.getElementById("soundtrack");
    if (!audioElement) {
        // Create audio element if it doesn't exist
        audioElement = document.createElement("audio");
        audioElement.id = "soundtrack";
        audioElement.src = "../assets/audios/MortalKombat.mp3";
        audioElement.loop = true;
        document.body.appendChild(audioElement);
    }
    return audioElement;
}

function playSoundtrack() {
    const soundtrack = createAudioElement();
    if (soundtrack) {
        soundtrack.volume = 0.5; // Set the volume to 50%
        soundtrack.play().catch((error) => {
            console.log("Error en el sonido de fondo:", error);
        });
    }
}

function playSoundSelectionSelector() {
    const selectionSelector = createAudioElement();
    if (selectionSelector) {
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
});
