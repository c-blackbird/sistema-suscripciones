// src/Repositories/UserRepository.ts
import { DatabaseConnection } from '../Config/DatabaseConnection';
import { IUserRepository } from './Interfaces/IUserRepository';
import { User } from '../Models/User';

export class UserRepository implements IUserRepository {
    private db: DatabaseConnection;
    private collectionName: string = 'users';

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async findById(id: string): Promise<User | null> {
        const userData = this.db.findById(this.collectionName, id);
        return userData ? this.mapToUser(userData) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const users = this.db.findAll(this.collectionName);
        const userData = users.find(user => user.email === email);
        return userData ? this.mapToUser(userData) : null;
    }

    async create(user: User): Promise<User> {
        this.db.insert(this.collectionName, { ...user });
        return user;
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        const existing = await this.findById(id);
        if (!existing) return null;
        
        const updated = { ...existing, ...user, updatedAt: new Date() };
        this.db.update(this.collectionName, id, updated);
        return this.mapToUser(updated);
    }

    async delete(id: string): Promise<boolean> {
        return this.db.delete(this.collectionName, id);
    }

    async findAll(): Promise<User[]> {
        const users = this.db.findAll(this.collectionName);
        return users.map(user => this.mapToUser(user));
    }

    private mapToUser(data: any): User {
        return new User(
            data.id,
            data.name,
            data.email,
            data.password,
            data.preferences,
            new Date(data.createdAt),
            new Date(data.updatedAt)
        );
    }
}