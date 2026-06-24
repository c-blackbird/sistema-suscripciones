import { IUserRepository } from './Interfaces/IUserRepository';
import { User } from '../Models/User';
export declare class UserRepository implements IUserRepository {
    private db;
    private collectionName;
    constructor();
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<User[]>;
    private mapToUser;
}
