"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// src/Repositories/UserRepository.ts
const DatabaseConnection_1 = require("../Config/DatabaseConnection");
const User_1 = require("../Models/User");
class UserRepository {
    constructor() {
        this.collectionName = 'users';
        this.db = DatabaseConnection_1.DatabaseConnection.getInstance();
    }
    async findById(id) {
        const userData = this.db.findById(this.collectionName, id);
        return userData ? this.mapToUser(userData) : null;
    }
    async findByEmail(email) {
        const users = this.db.findAll(this.collectionName);
        const userData = users.find(user => user.email === email);
        return userData ? this.mapToUser(userData) : null;
    }
    async create(user) {
        this.db.insert(this.collectionName, { ...user });
        return user;
    }
    async update(id, user) {
        const existing = await this.findById(id);
        if (!existing)
            return null;
        const updated = { ...existing, ...user, updatedAt: new Date() };
        this.db.update(this.collectionName, id, updated);
        return this.mapToUser(updated);
    }
    async delete(id) {
        return this.db.delete(this.collectionName, id);
    }
    async findAll() {
        const users = this.db.findAll(this.collectionName);
        return users.map(user => this.mapToUser(user));
    }
    mapToUser(data) {
        return new User_1.User(data.id, data.name, data.email, data.password, data.preferences, new Date(data.createdAt), new Date(data.updatedAt));
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map