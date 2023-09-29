import StateManager from "../StateManager.js";
import SortingManager from "../sorting/SortingManager.js";
import Utils from "../utils/Utils.js";

const REGULAR_COLOR = "#22668d";
const COMPARE1_COLOR = "hsla(355, 49%, 52%, 1)";
const COMPARE2_COLOR = "hsla(53, 98%, 65%, 1)";
const SORTED_COLOR = "hsla(79, 54%, 51%, 1)";

export default class BarAnimator {
    /**
     * @param {StateManager} stateManager
     */
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.oscillatorList = [];
    }

    async animateSort(type) {
        this.state = this.stateManager.getState();
        this.array = this.stateManager.getArray();
        this.dynamicSleepTime = Math.max(5, 500 / this.array.length);
        this.barElements = this.stateManager.getBarElements();

        if (this.state || !this.array.length || !this.barElements.length)
            return;

        this.stateManager.setState(true);

        const sorting_manager = new SortingManager(this.array);
        let steps = [];

        switch (type) {
            case "bubble":
                steps = sorting_manager.bubbleSort();
                break;

            case "merge":
                steps = sorting_manager.mergeSort();
                break;

            case "quick":
                steps = sorting_manager.quickSort();
                break;

            case "heap":
                steps = sorting_manager.heapSort();
                break;

            case "radix":
                steps = sorting_manager.radixSort();
                break;
        }

        for (const step of steps) {
            await this.performStep(step);
        }

        this.stateManager.setState(false);
    }

    async performStep(step) {
        const [index1, index2] = step.indices;
        const bar1 = this.barElements[index1];
        const bar2 = this.barElements[index2];

        if (step.type === "compare") {
            this.soundAccess(index1, this.array.length);
            await this.compareBars(bar1, bar2);
        } else if (step.type === "swap") {
            this.soundAccess(index1, this.array.length);
            await this.swapBars(bar1, bar2);
        } else if (step.type === "sorted") {
            if (this.array.length == index2 - index1 + 1) return;
            await this.highlightSortedBars(index1, index2, 10);
        } else if (step.type === "replace") {
            await this.replaceBars(step.indices, step.values);
        } else if (step.type === "finish") {
            await this.highlightSortedBars(index1, index2, 50);
        }
    }

    async replaceBars(indices, values) {
        const [start, end] = indices;

        for (let i = start, j = 0; i <= end; i++, j++) {
            this.soundAccess(i, end);
            const bar = this.barElements[i];
            bar.style.height = `${values[j]}px`;
            await Utils.sleep(this.dynamicSleepTime);
        }
    }

    async highlightSortedBars(start, finish, time) {
        await this.highlightBarsInRange(start, finish, SORTED_COLOR);
        await Utils.sleep(this.dynamicSleepTime * time);
        await this.highlightBarsInRange(start, finish, REGULAR_COLOR);
    }

    async highlightBarsInRange(start, finish, color) {
        for (let i = start; i <= finish; i++) {
            if (
                finish - start + 1 == this.array.length &&
                color != REGULAR_COLOR
            )
                this.soundAccess(i, finish);
            const bar = this.barElements[i];
            await this.highlightBar(bar, color, i);
        }
    }

    async highlightBar(bar, color, index) {
        bar.style.backgroundColor = color;
        await Utils.sleep(this.dynamicSleepTime);
    }

    async compareBars(bar1, bar2) {
        bar1.style.backgroundColor = COMPARE1_COLOR;
        bar2.style.backgroundColor = COMPARE2_COLOR;

        await Utils.sleep(this.dynamicSleepTime * 5);

        bar1.style.backgroundColor = REGULAR_COLOR;
        bar2.style.backgroundColor = REGULAR_COLOR;
    }

    async swapBars(bar1, bar2) {
        const temp = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = temp;
        await Utils.sleep(50);
    }

    addOscillator(freq, startTime, duration) {
        if (this.oscillatorList.length >= 512) {
            const oldest = this.oscillatorList.shift();
            oldest.stop();
        }

        const audioCtx = this.stateManager.getAudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        oscillator.connect(gainNode).connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.025);
        gainNode.gain.linearRampToValueAtTime(0.05, startTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);

        this.oscillatorList.push(oscillator);
    }

    soundAccess(index, arraySize) {
        if (this.stateManager.getMute()) return;
        try {
            const audioCtx = this.stateManager.getAudioContext();
            const normalizedIndex = index / arraySize;
            const freq = 120 + 1200 * Math.sin(Math.PI * normalizedIndex);
            const now = audioCtx.currentTime;
            const duration = 0.1;

            this.addOscillator(freq, now, duration);
        } catch (err) {
            console.log(err);
        }
    }
}
