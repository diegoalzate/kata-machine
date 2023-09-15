export default class MinHeap {
    public length: number;
    public arrayList: Array<number>;

    constructor() {
        this.arrayList = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.arrayList[this.length] = value;
        this.swapUp(this.length);
        this.length++;
    }

    getParent(index: number) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChild(index: number) {
        return 2 * index + 1;
    }

    getRightChild(index: number) {
        return 2 * index + 2;
    }

    swapUp(index: number): Boolean {
        if (index === 0) {
            return true;
        }

        const currentValue = this.arrayList[index];
        const parentIndex = this.getParent(index);
        const parentValue = this.arrayList[parentIndex];

        if (currentValue < parentValue) {
            const temp = currentValue;
            this.arrayList[index] = parentValue;
            this.arrayList[parentIndex] = temp;
            return this.swapUp(parentIndex);
        }

        return true;
    }

    swapDown(index: number): Boolean {
        const leftChildIndex = this.getLeftChild(index);
        const rightChildIndex = this.getRightChild(index);

        if (leftChildIndex > this.length) {
            return true;
        }

        const leftChildValue = this.arrayList[leftChildIndex];
        const rightChildValue = this.arrayList[rightChildIndex];
        const currentValue = this.arrayList[index];

        if (leftChildValue < rightChildValue && leftChildValue < currentValue) {
            // swap with left child
            const temp = currentValue;
            this.arrayList[index] = leftChildValue;
            this.arrayList[leftChildIndex] = temp;
            return this.swapDown(leftChildIndex);
        }

        if (
            rightChildValue < leftChildValue &&
            rightChildValue < currentValue
        ) {
            // swap with right child
            const temp = currentValue;
            this.arrayList[index] = rightChildValue;
            this.arrayList[rightChildIndex] = temp;
            return this.swapDown(rightChildIndex);
        }

        return true;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const head = this.arrayList[0];
        const tail = this.arrayList[this.length - 1];
        this.arrayList[0] = tail;
        this.length--;
        this.swapDown(0);

        return head;
    }
}
