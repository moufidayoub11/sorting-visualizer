export default class StateManager {
    constructor() {
        if (StateManager.instance) {
            return StateManager.instance;
        }

        /** @type {boolean} state */
        this.state = false;
        /** @type {boolean} mute */
        this.mute = false;
        /** @type {number[]} array */
        this.array = [];
        /** @type {HTMLElement[]} barElements */
        this.barElements = [];
        /** @type {AudioContext} audioContext*/
        this.audioContext = null;

        StateManager.instance = this;
    }

    setState(newState) {
        this.state = newState;
    }
    getState() {
        return this.state;
    }

    setArray(newArray) {
        this.array = newArray;
    }
    getArray() {
        return this.array;
    }

    setBarElements(newBE) {
        this.barElements = newBE;
    }
    getBarElements() {
        return this.barElements;
    }

    setAudioContext(newtContext) {
        this.audioContext = newtContext;
    }
    getAudioContext() {
        return this.audioContext;
    }

    setMute(newtMute) {
        this.mute = newtMute;
    }
    getMute() {
        return this.mute;
    }
}
