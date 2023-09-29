import StateManager from "../StateManager.js";
import Utils from "../utils/Utils.js";

export default class BarCreator {
    /**
     *
     * @param {HTMLElement} bars_container
     * @param {number} default_size
     * @param {StateManager} stateManager
     */
    constructor(bars_container, default_size = 100, stateManager) {
        this.stateManager = stateManager;
        this.default_size = default_size;
        this.barsContainer = bars_container;

        /**
         * @type {HTMLElement[]} barElements - all bars
         */

        this.initBars();

        window.addEventListener("resize", () => this.initBars());
    }

    resize(default_size = 100) {
        this.default_size = default_size;

        if (this.stateManager.getState()) return;
        this.initBars();
    }

    initBars() {
        this.state = this.stateManager.getState();
        if (this.state) return;

        this.stateManager.setState(true);
        this.barsContainer.innerHTML = "";
        this.barElements = [];

        this.calculateDim();

        this.array = this.populateArray();

        this.array.forEach((height, index) => this.createBar(height, index));

        this.stateManager.setArray(this.array);
        this.stateManager.setBarElements(this.barElements);
        this.stateManager.setState(false);
    }

    createBar(height, index) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.id = `bar-${index}`;

        bar.style.setProperty("height", `${height}px`);
        bar.style.setProperty("width", `${this.maxWidth}%`);

        this.barsContainer.appendChild(bar);
        this.barElements.push(bar);
    }

    populateArray() {
        return Array.from({ length: this.size }, () =>
            Utils.randomInt(10, this.maxHeight)
        );
    }

    calculateDim() {
        this.size = this.getSize(this.default_size);
        this.maxHeight = this.barsContainer.clientHeight;
        this.maxWidth = Math.floor(this.barsContainer.clientWidth / this.size);
    }

    getSize(size) {
        return Math.min(size, Math.floor(this.barsContainer.clientWidth / 3));
    }
}
