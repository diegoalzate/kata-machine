export default class ArrayList<T> {
    public length: number;
    public capacity: number;
    // not really fixed size but we can imagine
    public array: Array<T>;

    constructor(size: number) {
        this.capacity = size;
        this.length = 0;
        this.array = new Array(size);
    }

    // enqueue
    prepend(item: T): void {
        if (this.length === this.capacity) {
            // increase array capacity
            const smallArray = this.array;
            this.array = new Array(this.capacity * 2);
            // copy items from last array to new one
            for (let i = 1; i < smallArray.length; i++) {
                // 1 offset to copy the start of the previous list
                this.array[i] = smallArray[i - 1];
            }
            this.array[0] = item;
        } else {
            // move all items by one and start 1 after the desired position
            // since there is no temp copy then we go from start
            for (let i = this.array.length - 1; i > 0; i--) {
                this.array[i] = this.array[i - 1];
            }
            this.array[0] = item;
        }
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (this.length === this.capacity) {
            // increase array capacity
            const smallArray = this.array;
            this.array = new Array(this.capacity * 2);
            let insertedItem = false;
            // copy items from last array to new one
            for (let i = 0; i < smallArray.length; i++) {
                if (i === idx) {
                    this.array[i] = item;
                    insertedItem = true;
                } else {
                    // there is a 1 offset if a new item was already added to the list
                    this.array[i] = smallArray[insertedItem ? i - 1 : i];
                }
            }
        } else {
            // move all items by one and start 1 after the desired position
            // since there is no temp copy then we go from start
            for (let i = this.array.length - 1; i > idx; i--) {
                this.array[i] = this.array[i - 1];
            }
            this.array[idx] = item;
        }
        this.length++;
    }

    // push
    append(item: T): void {
        if (this.length === this.capacity) {
            // increase array capacity
            const smallArray = this.array;
            this.array = new Array(this.capacity * 2);
            // copy items from last array to new one
            for (let i = 0; i < smallArray.length; i++) {
                this.array[i] = smallArray[i];
            }
        }

        this.array[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        let foundItem: T | undefined;

        for (let i = 0; i < this.length; i++) {
            if (!!foundItem) {
                this.array[i] = this.array[i + 1];
            } else if (this.array[i] === item) {
                // activate remove logic
                foundItem = this.array[i];
                this.array[i] = this.array[i + 1];
            }
        }

        if (!!foundItem) {
            this.length--;
            return foundItem;
        }

        return;
    }

    get(idx: number): T | undefined {
        if (idx > this.length) return;
        return this.array[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) return;

        let deletedItem = this.array[idx];

        for (let i = idx; i < this.length; i++) {
            this.array[idx] = this.array[idx + 1];
        }

        this.length--;
        return deletedItem;
    }
}
