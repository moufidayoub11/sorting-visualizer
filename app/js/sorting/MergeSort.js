import Sort from "./Sort.js";

export default class MergeSort extends Sort {
    constructor(array) {
        super(array);
    }

    merge(left, right, leftStart, rightEnd) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            this.steps.push({
                type: "compare",
                indices: [
                    leftStart + leftIndex,
                    rightEnd - right.length + rightIndex,
                ],
            });

            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        while (leftIndex < left.length) {
            result.push(left[leftIndex]);
            leftIndex++;
        }

        while (rightIndex < right.length) {
            result.push(right[rightIndex]);
            rightIndex++;
        }

        this.steps.push({
            type: "replace",
            indices: [leftStart, rightEnd],
            values: result,
        });

        for (let i = 0; i < result.length; i++) {
            this.array[leftStart + i] = result[i];
        }

        this.steps.push({
            type: "sorted",
            indices: [leftStart, rightEnd],
        });
    }

    mergeSortHelper(array, left, right) {
        if (left >= right) return;

        const middle = Math.floor((left + right) / 2);

        this.mergeSortHelper(array, left, middle);
        this.mergeSortHelper(array, middle + 1, right);

        const leftArray = array.slice(left, middle + 1);
        const rightArray = array.slice(middle + 1, right + 1);

        this.merge(leftArray, rightArray, left, right);
    }

    sort() {
        this.mergeSortHelper(this.array, 0, this.array.length - 1);
        this.steps.push({
            type: "finish",
            indices: [0, this.array.length - 1],
        });

        return this.steps;
    }
}
