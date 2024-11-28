class InMemoryStorage {
    private store: Map<string, any>;

    constructor() {
        if (globalThis.receipts) {
            this.store = globalThis.receipts;
        } else {
            this.store = new Map();
            globalThis.receipts = this.store;
        }
    }

    get(key: string) {
        return this.store.get(key);
    }

    set(key: string, value: any): boolean {
        this.store.set(key, value);
        return this.store.has(key);
    }

    has(key: string) {
        return this.store.has(key);
    }

    getAll() {
        return Array.from(this.store.entries());
    }
}

export const receipts = new InMemoryStorage();
