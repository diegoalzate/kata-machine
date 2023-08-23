type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    public head: Node<T> | undefined;
    public tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        // add to the end of the line
        if (!this.tail) {
            this.head = this.tail = {
                value: item,
            };
            this.length += 1;
            return;
        }

        this.tail.next = { value: item };
        this.tail = this.tail.next;
        this.length += 1;
        return;
    }

    deque(): T | undefined {
        // remove from the start of the line
        if (!this.head) {
            return;
        }

        const headValue = this.head.value;

        if (!this.head.next) {
            // last item
            this.head = this.tail = undefined;
            this.length -= 1;
            return headValue;
        }

        this.head = this.head.next;
        this.length -= 1;
        return headValue;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
