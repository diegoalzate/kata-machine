//const arr = [9, 3, 7, 4, 69, 420, 42];
// const arr = [9, 3, 7, 4, 69, 420, 42];

// does the book keeping for the recursive quicksort
const partition = (arr: number[], lo: number, hi: number): void => {
    // base condition
    // really the base condition is lo===hi but just in case
    if (lo >= hi) {
        return;
    }

    const pivot = qs(arr, lo, hi);

    // we don't include pivot because it should be sorted already
    // this algo is inclusive [lo, hi]
    partition(arr, lo, pivot - 1);
    partition(arr, pivot + 1, hi);
};

// does the actual sorting for the partition
const qs = (arr: number[], lo: number, hi: number): number => {
    const pivot = arr[hi];

    // self handled index used to know where the pivot should
    // go after sorting
    let idx = lo - 1;

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            // swap element and idx
            idx++;
            const temp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = temp;
        }
    }

    // put pivot after idx because that
    // will make sure all elements before it
    // are less
    idx++;
    // swap the pivot element with idx element so you don't loose values
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
};

export default function quick_sort(arr: number[]): void {
    partition(arr, 0, arr.length - 1);
}
