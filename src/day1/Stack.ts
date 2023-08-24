type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const newNode: Node<T> = {
            value: item,
        };

        this.length += 1;

        if (!this.head) {
            this.head = newNode;
            return;
        }

        newNode.prev = this.head;
        this.head = newNode;
        return;
    }

    pop(): T | undefined {
        if (!this.head) {
            // nothing to pop
            return;
        }

        const head = this.head;
        this.length -= 1;

        if (!this.head.prev) {
            // last item
            this.head = undefined;
            return head.value;
        }

        this.head = head.prev;
        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
