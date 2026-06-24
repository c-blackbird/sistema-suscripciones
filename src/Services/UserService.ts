// src/Services/UserService.ts
import { IUserRepository } from '../Repositories/Interfaces/IUserRepository';
import { User } from '../Models/User';
import { UserPreferences, defaultPreferences } from '../Models/UserPreferences';
import { randomUUID } from 'crypto';

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async register(userData: {
        name: string;
        email: string;
        password: string;
        preferences?: Partial<UserPreferences>;
    }): Promise<User> {
        try {
            console.log(`\n[userservice] registering user...`);

            const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error(`user with email ${userData.email} already exists`);
            }

            const preferences: UserPreferences = {
                ...defaultPreferences,
                ...userData.preferences
            };

            const user = new User(
                randomUUID(),
                userData.name,
                userData.email,
                userData.password,
                preferences
            );

            await this.userRepository.create(user);

            console.log(`user registered successfully:`);
            console.log(`   name: ${user.name}`);
            console.log(`   email: ${user.email}`);
            console.log(`   id: ${user.id}`);

            return user;
        } catch (error) {
            console.error(`error registering user:`, error);
            throw error;
        }
    }

    async getUser(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, userData);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}