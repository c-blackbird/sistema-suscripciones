export declare class DatabaseConnection {
    private static instance;
    private data;
    private constructor();
    private initializeCollections;
    static getInstance(): DatabaseConnection;
    getCollection(collection: string): any[];
    insert(collection: string, item: any): void;
    findById(collection: string, id: string): any | null;
    update(collection: string, id: string, data: any): boolean;
    delete(collection: string, id: string): boolean;
    findAll(collection: string): any[];
    clearCollection(collection: string): void;
    showStatus(): void;
    getAllData(): Map<string, any[]>;
}
