import Sort from "./Sort.js";

export default class HeapSort extends Sort {
    constructor(array) {
        super(array);
    }

    heapify(n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            this.steps.push({ type: "compare", indices: [i, left] });
        }

        if (left < n && this.array[left] > this.array[largest]) {
            largest = left;
        }

        if (right < n) {
            this.steps.push({ type: "compare", indices: [i, right] });
        }

        if (right < n && this.array[right] > this.array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            this.steps.push({ type: "swap", indices: [i, largest] });

            [this.array[i], this.array[largest]] = [
                this.array[largest],
                this.array[i],
            ];

            this.heapify(n, largest);
        }
    }

    sort() {
        const n = this.array.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(n, i);
        }

        for (let i = n - 1; i > 0; i--) {

            [this.array[0], this.array[i]] = [this.array[i], this.array[0]];
            this.steps.push({ type: "swap", indices: [0, i] });

            this.steps.push({ type: "sorted", indices: [i, i] });

            this.heapify(i, 0);
        }

        this.steps.push({
            type: "finish",
            indices: [0, this.array.length - 1],
        });

        return this.steps;
    }
}
