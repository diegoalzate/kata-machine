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

    // prepends node to the actual index
    insertAt(item: T, idx: number): void {
        if (this.length <= idx) {
            return;
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length - 1) {
            this.append(item);
            return;
        }

        // middle item
        let currentItem = this.head;

        const newNode: Node<T> = {
            value: item,
            next: undefined,
        };

        for (let i = 0; currentItem && i < this.length; i++) {
            if (i === idx - 1) {
                // found the node before the append
                break;
            }

            currentItem = currentItem?.next;
        }

        // ts stuff, possibly undefined but should always exist
        if (!currentItem) return;

        this.length += 1;
        newNode.next = currentItem?.next;
        currentItem.next = newNode;

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
