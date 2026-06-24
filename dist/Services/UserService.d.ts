import { IUserRepository } from '../Repositories/Interfaces/IUserRepository';
import { User } from '../Models/User';
import { UserPreferences } from '../Models/UserPreferences';
export declare class UserService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    register(userData: {
        name: string;
        email: string;
        password: string;
        preferences?: Partial<UserPreferences>;
    }): Promise<User>;
    getUser(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(id: string, userData: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
}
