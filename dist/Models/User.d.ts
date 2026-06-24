import { UserPreferences } from './UserPreferences';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: string, name: string, email: string, password: string, preferences?: UserPreferences, createdAt?: Date, updatedAt?: Date);
    update(data: Partial<User>): void;
    toJSON(): any;
}
