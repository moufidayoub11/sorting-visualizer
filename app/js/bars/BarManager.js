import StateManager from "../StateManager.js";
import BarCreator from "./BarCreator.js";
import BarAnimator from "./BarAnimator.js";

export default class BarManager {
    constructor(barsContainer, defaultSize = 100, audioContext) {
        this.stateManager = new StateManager();

        this.stateManager.setAudioContext(audioContext);

        this.barCreator = new BarCreator(
            barsContainer,
            defaultSize,
            this.stateManager
        );

        this.barAnimator = new BarAnimator(this.stateManager);
    }

    async sortBars(type) {
        await this.barAnimator.animateSort(type);
    }

	toggleMute() {
		let currentState = this.stateManager.getMute()
        this.stateManager.setMute(!currentState);
		return !currentState;
    }

    resetBars() {
        this.barCreator.initBars();
    }

    resizeBars(newSize) {
        this.barCreator.resize(newSize);
    }
}
