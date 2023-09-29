import Sort from "./Sort.js";

export default class QuickSort extends Sort {
    constructor(array) {
        super(array);
    }

    partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            this.steps.push({
                type: "compare",
                indices: [j, high],
            });

            if (this.array[j] < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];

                this.steps.push({
                    type: "swap",
                    indices: [i, j],
                });
            }
        }

        [this.array[i + 1], this.array[high]] = [
            this.array[high],
            this.array[i + 1],
        ];

        this.steps.push({
            type: "swap",
            indices: [i + 1, high],
        });

        return i + 1;
    }

    quickSortHelper(low, high) {
        if (low < high) {
            const pi = this.partition(low, high);

            this.quickSortHelper(low, pi - 1);
            this.quickSortHelper(pi + 1, high);
        } else if (low === high) {
            this.steps.push({
                type: "sorted",
                indices: [low, high],
            });
        }
    }

    sort() {
        this.quickSortHelper(0, this.array.length - 1);

        this.steps.push({
            type: "finish",
            indices: [0, this.array.length - 1],
        });

        return this.steps;
    }
}
