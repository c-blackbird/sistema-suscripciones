"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../Models/User");
const UserPreferences_1 = require("../Models/UserPreferences");
const crypto_1 = require("crypto");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(userData) {
        try {
            console.log(`\n[userservice] registering user...`);
            const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error(`user with email ${userData.email} already exists`);
            }
            const preferences = {
                ...UserPreferences_1.defaultPreferences,
                ...userData.preferences
            };
            const user = new User_1.User((0, crypto_1.randomUUID)(), userData.name, userData.email, userData.password, preferences);
            await this.userRepository.create(user);
            console.log(`user registered successfully:`);
            console.log(`   name: ${user.name}`);
            console.log(`   email: ${user.email}`);
            console.log(`   id: ${user.id}`);
            return user;
        }
        catch (error) {
            console.error(`error registering user:`, error);
            throw error;
        }
    }
    async getUser(id) {
        return this.userRepository.findById(id);
    }
    async getUserByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async updateUser(id, userData) {
        return this.userRepository.update(id, userData);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
    async getAllUsers() {
        return this.userRepository.findAll();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map