// src/Config/DatabaseConnection.ts
export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private data: Map<string, any[]>;

    private constructor() {
        this.data = new Map();
        this.initializeCollections();
    }

    private initializeCollections(): void {
        const collections = ['users', 'subscriptions', 'invoices', 'payments', 'metrics'];
        collections.forEach(collection => {
            this.data.set(collection, []);
        });
        console.log('database initialized (singleton)');
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public getCollection(collection: string): any[] {
        if (!this.data.has(collection)) {
            this.data.set(collection, []);
        }
        return this.data.get(collection)!;
    }

    public insert(collection: string, item: any): void {
        const collectionData = this.getCollection(collection);
        collectionData.push(item);
        console.log(`inserted in ${collection}: ${item.id || item.name || 'item'}`);
    }

    public findById(collection: string, id: string): any | null {
        const collectionData = this.getCollection(collection);
        return collectionData.find(item => item.id === id) || null;
    }

    public update(collection: string, id: string, data: any): boolean {
        const collectionData = this.getCollection(collection);
        const index = collectionData.findIndex(item => item.id === id);
        if (index !== -1) {
            collectionData[index] = { ...collectionData[index], ...data };
            console.log(`updated in ${collection}: ${id}`);
            return true;
        }
        return false;
    }

    public delete(collection: string, id: string): boolean {
        const collectionData = this.getCollection(collection);
        const index = collectionData.findIndex(item => item.id === id);
        if (index !== -1) {
            collectionData.splice(index, 1);
            console.log(`deleted from ${collection}: ${id}`);
            return true;
        }
        return false;
    }

    public findAll(collection: string): any[] {
        return this.getCollection(collection);
    }

    public clearCollection(collection: string): void {
        this.data.set(collection, []);
        console.log(`collection cleared: ${collection}`);
    }

    public showStatus(): void {
        console.log('\ndatabase status:');
        for (const [key, value] of this.data) {
            console.log(`  ${key}: ${value.length} records`);
        }
        console.log('');
    }

    public getAllData(): Map<string, any[]> {
        return this.data;
    }
}