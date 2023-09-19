type TrieNode<T> = {
    parent?: TrieNode<T>;
    isWord?: boolean;
    value: T
    // size 26 depending on the alphabet
    // ordered alphabet
    children: Array<TrieNode<T> | null>

}

// english library trie
export default class Trie {
    // blank head
    head: TrieNode<string>



    constructor() {
        this.head = {
            value: '',
            children: [],
        }
    }

    insert(item: string): void {
        let currentNode = this.head
        for (let i = 0; i < item.length; i++) {
            const char = item.charAt(i);
            const charIndex = this.getCharIndex(char)
            const nextChar = currentNode?.children[charIndex]
            if (!nextChar) {
                // create node
                const isWord = i === item.length - 1 ? true : undefined;
                const newNode = this.createNode(currentNode, char, isWord)
                currentNode = newNode
            } else {
                currentNode = nextChar
            }
        }
    }

    getCharIndex(char: string): number {
        const firstLetter = 'a'.codePointAt(0)
        if (!firstLetter) return -1

        return (char.codePointAt(0) ?? firstLetter) - firstLetter
    }

    createNode(currentNode: TrieNode<string>, item: string, isWord?: boolean): TrieNode<string> {
        const newNode: TrieNode<string> = {
            children: [],
            value: item,
            isWord: isWord,
            parent: currentNode
        }
        const newCharIndex = this.getCharIndex(item)
        currentNode.children[newCharIndex] = newNode

        return newNode
    }

    delete(item: string): void {
        // find the last node for the word
        let currentNode = this.head;

        for (let char of item) {
            const nextNode = this.findNextNode(currentNode, char)
            if (!nextNode) return
            currentNode = nextNode
        }

        // make isWord false in case the last letter has children
        currentNode.isWord = false
        // delete up to parent until you find a parent with children
        this.removeBranchForWord(currentNode)
    }

    removeBranchForWord(currentNode: TrieNode<string>): void {
        const childrenWithValues = currentNode.children.filter(a => !!a).length
        if (childrenWithValues > 0) {
            return
        }

        if (!currentNode) {
            return
        }

        const parent = currentNode.parent

        if (!parent) return

        const currentNodeIndex = this.getCharIndex(currentNode.value)
        parent.children[currentNodeIndex] = null
        return this.removeBranchForWord(parent)
    }

    searchForWords(currentNode: TrieNode<string> | null, path: string, words: string[]) {
        if (!currentNode) {
            return
        }

        const localPath = path + currentNode.value

        if (currentNode.isWord) {
            words.push(localPath)
        }

        if (currentNode.children.length === 0) {
            return
        }


        for (let i = 0; i < currentNode.children.length; i++) {
            this.searchForWords(currentNode.children[i], localPath, words)
        }
    }

    findNextNode(currentNode: TrieNode<string>, letter: string): TrieNode<string> | null {
        const nextLetterIndex = this.getCharIndex(letter);
        const nextNode = currentNode.children[nextLetterIndex];
        return nextNode
    }

    find(partial: string): string[] {
        // you want to traverse all children 
        // until no more can be found
        // every time you see an isWord 
        // you add it to array
        const autoComplete: string[] = []
        let currentNode = this.head;

        // step 1 find the word node
        for (let char of partial) {
            const nextNode = this.findNextNode(currentNode, char)
            if (!nextNode) return autoComplete
            currentNode = nextNode
        }

        // step 2 get rest of partials from current node
        const path = partial.slice(0, partial.length - 1)
        this.searchForWords(currentNode, path, autoComplete)
        return autoComplete
    }
}