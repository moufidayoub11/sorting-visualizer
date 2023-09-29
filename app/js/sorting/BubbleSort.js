import Sort from "./Sort.js";

export default class BubbleSort extends Sort {
    constructor(array) {
        super(array);
    }

    sort() {
        const len = this.array.length;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                this.steps.push({ type: "compare", indices: [j, j + 1] });

                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [
                        this.array[j + 1],
                        this.array[j],
                    ];
                    this.steps.push({ type: "swap", indices: [j, j + 1] });
                }
            }
        }

        this.steps.push({ type: "finish", indices: [0, len - 1] });

        return this.steps;
    }
}
