import BarManager from "./bars/BarManager.js";

document.addEventListener("DOMContentLoaded", async () => {
    const barsContainer = document.querySelector(".bars-container");
    const resetButton = document.querySelector(".navbar-buttons-clear");
    const sortButton = document.querySelector(".navbar-buttons-sort");
    const muteButton = document.querySelector(".navbar-buttons-volume");
    const algorithm_select = document.querySelector("#algorithm-select");
    const arraySizeSlider = document.querySelector("#array-size");

    const audioContext = new window.AudioContext();

    let selected_algorithm = algorithm_select.value;
    let bar_manager = new BarManager(
        barsContainer,
        arraySizeSlider.value,
        audioContext
    );

    resetButton.addEventListener("click", () => bar_manager.resetBars());

    arraySizeSlider.addEventListener("input", (event) =>
        bar_manager.resizeBars(event.target.value)
    );

    sortButton.addEventListener("click", async () =>
        bar_manager.sortBars(selected_algorithm)
    );

    algorithm_select.addEventListener("change", function (e) {
        selected_algorithm = this.value;
    });

    muteButton.addEventListener("click", () => {
        let mute = bar_manager.toggleMute();
        muteButton.innerText = mute ? "Unmute!" : "mute";
    });
});

async function loadMelodie(url, audioContext) {
    let buffer = null;
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        buffer = await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.error("An error occurred:", error);
    }
    return buffer;
}
