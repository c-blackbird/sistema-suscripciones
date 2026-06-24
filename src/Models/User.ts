// src/Models/User.ts
import { UserPreferences, defaultPreferences } from './UserPreferences';

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public preferences: UserPreferences = { ...defaultPreferences },
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}

    public update(data: Partial<User>): void {
        Object.assign(this, data);
        this.updatedAt = new Date();
    }

    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            preferences: this.preferences,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}