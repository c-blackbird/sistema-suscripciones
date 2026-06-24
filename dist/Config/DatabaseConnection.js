"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
// src/Config/DatabaseConnection.ts
class DatabaseConnection {
    constructor() {
        this.data = new Map();
        this.initializeCollections();
    }
    initializeCollections() {
        const collections = ['users', 'subscriptions', 'invoices', 'payments', 'metrics'];
        collections.forEach(collection => {
            this.data.set(collection, []);
        });
        console.log('database initialized (singleton)');
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    getCollection(collection) {
        if (!this.data.has(collection)) {
            this.data.set(collection, []);
        }
        return this.data.get(collection);
    }
    insert(collection, item) {
        const collectionData = this.getCollection(collection);
        collectionData.push(item);
        console.log(`inserted in ${collection}: ${item.id || item.name || 'item'}`);
    }
    findById(collection, id) {
        const collectionData = this.getCollection(collection);
        return collectionData.find(item => item.id === id) || null;
    }
    update(collection, id, data) {
        const collectionData = this.getCollection(collection);
        const index = collectionData.findIndex(item => item.id === id);
        if (index !== -1) {
            collectionData[index] = { ...collectionData[index], ...data };
            console.log(`updated in ${collection}: ${id}`);
            return true;
        }
        return false;
    }
    delete(collection, id) {
        const collectionData = this.getCollection(collection);
        const index = collectionData.findIndex(item => item.id === id);
        if (index !== -1) {
            collectionData.splice(index, 1);
            console.log(`deleted from ${collection}: ${id}`);
            return true;
        }
        return false;
    }
    findAll(collection) {
        return this.getCollection(collection);
    }
    clearCollection(collection) {
        this.data.set(collection, []);
        console.log(`collection cleared: ${collection}`);
    }
    showStatus() {
        console.log('\ndatabase status:');
        for (const [key, value] of this.data) {
            console.log(`  ${key}: ${value.length} records`);
        }
        console.log('');
    }
    getAllData() {
        return this.data;
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=DatabaseConnection.js.map