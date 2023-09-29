import BubbleSort from "./BubbleSort.js";
import HeapSort from "./HeapSort.js";
import MergeSort from "./MergeSort.js";
import QuickSort from "./QuickSort.js";
import RadixSort from "./RadixSort.js";

export default class SortingManager {
    constructor(array) {
        this.array = array;
    }

    bubbleSort() {
        const bubble_sort = new BubbleSort(this.array);

        return bubble_sort.sort();
    }

    mergeSort() {
        const merge_sort = new MergeSort(this.array);

        return merge_sort.sort();
    }

    heapSort() {
        const heap_sort = new HeapSort(this.array);

        return heap_sort.sort();
    }

    radixSort() {
        const radix_sort = new RadixSort(this.array);

        return radix_sort.sort();
    }

    quickSort() {
        const quick_sort = new QuickSort(this.array);
        return quick_sort.sort();
    }
}
