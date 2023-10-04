type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    // used to delete index
    // on lookup after deleting from list
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // check if value exists
        const nodeValue = this.get(key);
        if (!nodeValue) {
            // create node
            const newNode: Node<V> = {
                value,
            };
            this.prepend(newNode);
            this.trim();
            // update lookups
            this.lookup.set(key, newNode);
            this.reverseLookup.set(newNode, key);
        } else {
            const foundNode = this.lookup.get(key) as Node<V>;
            const updatedNode = { ...foundNode, value: value };
            // update node
            this.detach(foundNode);
            this.prepend(updatedNode);
            // update lookups
            this.lookup.set(key, updatedNode);
            this.reverseLookup.set(updatedNode, key);
        }
    }

    get(key: K): V | undefined {
        // check if node exists
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        this.detach(node);
        this.prepend(node);
        return node.value;
    }

    prepend(node: Node<V>): void {
        this.length++;
        // there is no head
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        // there is head
        const tempHead = this.head;
        tempHead.prev = node;
        node.next = tempHead;
        node.prev = undefined;
        this.head = node;
        return;
    }

    detach(node: Node<V>): void {
        this.length--;
        const prevNode = node.prev;
        const nextNode = node.next;

        if (this.length === 0) {
            this.head = this.tail = undefined;
            return;
        }

        // if it is tail
        if (node === this.tail && prevNode) {
            prevNode.next = undefined;
            node.prev = undefined;
            this.tail = prevNode;
            return;
        }

        // if it is head
        if (node === this.head && nextNode) {
            nextNode.prev = undefined;
            node.next = undefined;
            this.head = nextNode;
            return;
        }

        // middle node
        if (prevNode && nextNode) {
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            return;
        }
    }

    // trim depends on capacity
    trim() {
        // if less than capacity then do nothing
        if (this.length <= this.capacity) {
            return;
        }

        // if more than capacity then remove tail and update length and lookups\
        const tail = this.tail as Node<V>;
        this.detach(tail);
        const key = this.reverseLookup.get(tail);
        this.lookup.delete(key as K);
        this.reverseLookup.delete(this.tail as Node<V>);
    }
}
