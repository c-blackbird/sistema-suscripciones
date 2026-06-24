"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/Models/User.ts
const UserPreferences_1 = require("./UserPreferences");
class User {
    constructor(id, name, email, password, preferences = { ...UserPreferences_1.defaultPreferences }, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.preferences = preferences;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date();
    }
    toJSON() {
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
exports.User = User;
//# sourceMappingURL=User.js.map