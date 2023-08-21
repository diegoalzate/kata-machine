type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        if (!this.head) {
            this.head = this.tail = {
                value: item,
                next: undefined,
            };
            this.length += 1;
            return;
        }

        const lastHead = this.head;
        const node = { value: item, next: lastHead };
        this.head = node;
        this.length += 1;
    }

    insertAt(item: T, idx: number): void {
        let currentNode = this.head;

        for (let i = 0; i < this.length; i++) {
            if (!currentNode) {
                return;
            }

            if (i === idx) {
                currentNode.value = item;
            }
            currentNode = currentNode.next;
        }

        return undefined;
    }

    append(item: T): void {
        if (!this.tail) {
            this.head = this.tail = {
                value: item,
                next: undefined,
            };
            this.length += 1;
            return;
        }

        const node = { value: item };
        this.tail.next = node;
        this.tail = node;
        this.length += 1;
    }

    remove(item: T): T | undefined {
        let currentNode = this.head;
        let previousNode;
        for (let i = 0; i < this.length; i++) {
            if (!currentNode) {
                return;
            }

            if (currentNode.value === item) {
                if (!previousNode) {
                    // first node
                    this.head = currentNode.next;
                    this.length -= 1;
                    return currentNode.value;
                }

                // loose current node from chain
                previousNode.next = currentNode.next;
                currentNode.next = undefined;
                this.length -= 1;
                return currentNode.value;
            }

            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        let currentNode = this.head;

        for (let i = 0; i < this.length; i++) {
            if (!currentNode) {
                return;
            }

            if (i === idx) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }

        return undefined;
    }
    removeAt(idx: number): T | undefined {
        let currentNode = this.head;
        let previousNode;
        for (let i = 0; i < this.length; i++) {
            if (!currentNode) {
                return;
            }

            if (i === idx) {
                if (!previousNode) {
                    // first node
                    this.head = currentNode.next;
                    this.length -= 1;
                    return currentNode.value;
                }

                // loose current node from chain
                previousNode.next = currentNode.next;
                currentNode.next = undefined;
                this.length -= 1;
                return currentNode.value;
            }

            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        return undefined;
    }
}
