"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRepository = void 0;
// src/Repositories/SubscriptionRepository.ts
const DatabaseConnection_1 = require("../Config/DatabaseConnection");
const Subscription_1 = require("../Models/Subscription");
class SubscriptionRepository {
    constructor() {
        this.collectionName = 'subscriptions';
        this.db = DatabaseConnection_1.DatabaseConnection.getInstance();
    }
    async findById(id) {
        const data = this.db.findById(this.collectionName, id);
        return data ? this.mapToSubscription(data) : null;
    }
    async findByUserId(userId) {
        const subscriptions = this.db.findAll(this.collectionName);
        const userSubscriptions = subscriptions.filter(sub => sub.userId === userId);
        return userSubscriptions.map(sub => this.mapToSubscription(sub));
    }
    async create(subscription) {
        this.db.insert(this.collectionName, { ...subscription });
        return subscription;
    }
    async update(id, subscription) {
        const existing = await this.findById(id);
        if (!existing)
            return null;
        const updated = { ...existing, ...subscription, updatedAt: new Date() };
        this.db.update(this.collectionName, id, updated);
        return this.mapToSubscription(updated);
    }
    async delete(id) {
        return this.db.delete(this.collectionName, id);
    }
    async findActiveByUserId(userId) {
        const subscriptions = await this.findByUserId(userId);
        const active = subscriptions.find(sub => sub.isActive());
        return active || null;
    }
    async findExpiringSoon(daysThreshold = 7) {
        const subscriptions = this.db.findAll(this.collectionName);
        const activeSubscriptions = subscriptions
            .filter(sub => sub.status === Subscription_1.SubscriptionStatus.ACTIVE)
            .map(sub => this.mapToSubscription(sub));
        return activeSubscriptions.filter(sub => sub.isExpiringSoon(daysThreshold));
    }
    async findAll() {
        const subscriptions = this.db.findAll(this.collectionName);
        return subscriptions.map(sub => this.mapToSubscription(sub));
    }
    mapToSubscription(data) {
        return new Subscription_1.Subscription(data.id, data.userId, data.planType, data.status, new Date(data.startDate), new Date(data.endDate), data.autoRenew, data.price, new Date(data.createdAt), new Date(data.updatedAt));
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
//# sourceMappingURL=SubscriptionRepository.js.map