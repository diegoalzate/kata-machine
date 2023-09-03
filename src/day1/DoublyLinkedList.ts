type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const newNode: Node<T> = {
            value: item,
            prev: undefined,
            next: undefined,
        };

        if (!this.head) {
            this.head = this.tail = newNode;
            this.length += 1;
            return;
        }

        const previousHead = this.head;
        newNode.next = previousHead;
        previousHead.prev = newNode;
        this.head = newNode;
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
            prev: undefined,
            next: undefined,
        };

        for (let i = 0; currentItem && i < this.length; i++) {
            if (i === idx) {
                // found the node
                break;
            }

            currentItem = currentItem?.next;
        }

        this.length += 1;

        // ts stuff, possibly undefined but should always exist
        if (!currentItem) return;

        // place item into the new mix
        newNode.next = currentItem;
        newNode.prev = currentItem?.prev;
        // swap old connections
        const previousItem = currentItem.prev;
        currentItem.prev = newNode;

        // could be head and not have a previous
        if (!previousItem) return;
        previousItem.next = newNode;

        return;
    }

    append(item: T): void {
        const newNode: Node<T> = {
            value: item,
            prev: undefined,
            next: undefined,
        };

        if (!this.tail) {
            this.head = this.tail = newNode;
            this.length += 1;
            return;
        }

        const previousTail = this.tail;
        newNode.prev = previousTail;
        previousTail.next = newNode;
        this.tail = newNode;
        this.length += 1;
        return;
    }

    remove(item: T): T | undefined {
        let currentItem = this.head;
        let previousItem: Node<T> | undefined;

        for (let i = 0; i < this.length; i++) {
            if (!currentItem) {
                // no head to remove
                return;
            }

            if (currentItem.value === item) {
                let nextItem = currentItem.next;

                if (previousItem) {
                    previousItem.next = nextItem;
                } else {
                    // it is head
                    const nextItem = currentItem.next;
                    if (!nextItem) {
                        // last in list
                        this.head = this.tail = undefined;
                        this.length -= 1;
                        return currentItem.value;
                    }

                    nextItem.prev = undefined;
                    this.head = nextItem;
                    this.length -= 1;
                    return currentItem.value;
                }

                if (nextItem) {
                    nextItem.prev = previousItem;
                } else {
                    // it is tail
                    if (!previousItem) {
                        // last in list
                        this.head = this.tail = undefined;
                        this.length -= 1;
                        return currentItem.value;
                    }
                    previousItem.next = undefined;
                    this.tail = previousItem;
                    this.length -= 1;
                    return currentItem.value;
                }

                this.length -= 1;
                return currentItem.value;
            }

            previousItem = currentItem;
            currentItem = currentItem?.next;
        }

        return;
    }

    get(idx: number): T | undefined {
        let currentItem = this.head;

        if (!this.head) return;

        for (let i = 0; i < this.length; i++) {
            if (i === idx) {
                return currentItem?.value;
            }
            currentItem = currentItem?.next;
        }

        return;
    }

    removeAt(idx: number): T | undefined {
        let currentItem = this.head;
        let previousItem: Node<T> | undefined;

        for (let i = 0; i < this.length; i++) {
            if (!currentItem) {
                // no head to remove
                return;
            }

            if (i === idx) {
                let nextItem = currentItem.next;

                if (previousItem) {
                    previousItem.next = nextItem;
                } else {
                    // it is head
                    const nextItem = currentItem.next;
                    if (!nextItem) {
                        // last in list
                        this.head = this.tail = undefined;
                        this.length -= 1;
                        return currentItem.value;
                    }

                    nextItem.prev = undefined;
                    this.head = nextItem;
                    this.length -= 1;
                    return currentItem.value;
                }

                if (nextItem) {
                    nextItem.prev = previousItem;
                } else {
                    // it is tail
                    if (!previousItem) {
                        // last in list
                        this.head = this.tail = undefined;
                        this.length -= 1;
                        return currentItem.value;
                    }
                    previousItem.next = undefined;
                    this.tail = previousItem;
                    this.length -= 1;
                    return currentItem.value;
                }

                this.length -= 1;
                return currentItem.value;
            }

            previousItem = currentItem;
            currentItem = currentItem?.next;
        }

        return;
    }
}
