import Sort from "./Sort.js";

export default class RadixSort extends Sort {
    constructor(array) {
        super(array);
    }

    getDigit(num, place) {
        return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    }

    digitCount(num) {
        if (num === 0) return 1;
        return Math.floor(Math.log10(Math.abs(num))) + 1;
    }

    maxDigits() {
        let max = 0;
        for (let num of this.array) {
            max = Math.max(max, this.digitCount(num));
        }
        return max;
    }


    sort() {
        const maxDigitCount = this.maxDigits();

        for (let k = 0; k < maxDigitCount; k++) {
            let digitBuckets = Array.from({ length: 10 }, () => []);

            for (let i = 0; i < this.array.length; i++) {
                this.steps.push({ type: "compare", indices: [i, i] });
            }

            for (let i = 0; i < this.array.length; i++) {
                const digit = this.getDigit(this.array[i], k);
                digitBuckets[digit].push(this.array[i]);

                this.steps.push({ type: "compare", indices: [i, i] });
            }

            let idx = 0;
            for (let j = 0; j < digitBuckets.length; j++) {
                if (digitBuckets[j].length > 0) {
                    this.steps.push({
                        type: "sorted",
                        indices: [idx, idx + digitBuckets[j].length - 1],
                    });
                }

                for (let num of digitBuckets[j]) {
                    this.steps.push({
                        type: "replace",
                        indices: [idx, idx],
                        values: [num],
                    });
                    this.array[idx] = num;
                    idx++;
                }
            }

            this.steps.push({
                type: "sorted",
                indices: [0, this.array.length - 1],
            });
        }

        this.steps.push({
            type: "finish",
            indices: [0, this.array.length - 1],
        });
        return this.steps;
    }
}
