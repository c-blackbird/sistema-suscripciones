// src/Repositories/SubscriptionRepository.ts
import { DatabaseConnection } from '../Config/DatabaseConnection';
import { ISubscriptionRepository } from './Interfaces/ISubscriptionRepository';
import { Subscription, SubscriptionStatus } from '../Models/Subscription';

export class SubscriptionRepository implements ISubscriptionRepository {
    private db: DatabaseConnection;
    private collectionName: string = 'subscriptions';

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async findById(id: string): Promise<Subscription | null> {
        const data = this.db.findById(this.collectionName, id);
        return data ? this.mapToSubscription(data) : null;
    }

    async findByUserId(userId: string): Promise<Subscription[]> {
        const subscriptions = this.db.findAll(this.collectionName);
        const userSubscriptions = subscriptions.filter(sub => sub.userId === userId);
        return userSubscriptions.map(sub => this.mapToSubscription(sub));
    }

    async create(subscription: Subscription): Promise<Subscription> {
        this.db.insert(this.collectionName, { ...subscription });
        return subscription;
    }

    async update(id: string, subscription: Partial<Subscription>): Promise<Subscription | null> {
        const existing = await this.findById(id);
        if (!existing) return null;
        
        const updated = { ...existing, ...subscription, updatedAt: new Date() };
        this.db.update(this.collectionName, id, updated);
        return this.mapToSubscription(updated);
    }

    async delete(id: string): Promise<boolean> {
        return this.db.delete(this.collectionName, id);
    }

    async findActiveByUserId(userId: string): Promise<Subscription | null> {
        const subscriptions = await this.findByUserId(userId);
        const active = subscriptions.find(sub => sub.isActive());
        return active || null;
    }

    async findExpiringSoon(daysThreshold: number = 7): Promise<Subscription[]> {
        const subscriptions = this.db.findAll(this.collectionName);
        const activeSubscriptions = subscriptions
            .filter(sub => sub.status === SubscriptionStatus.ACTIVE)
            .map(sub => this.mapToSubscription(sub));
        
        return activeSubscriptions.filter(sub => sub.isExpiringSoon(daysThreshold));
    }

    async findAll(): Promise<Subscription[]> {
        const subscriptions = this.db.findAll(this.collectionName);
        return subscriptions.map(sub => this.mapToSubscription(sub));
    }

    private mapToSubscription(data: any): Subscription {
        return new Subscription(
            data.id,
            data.userId,
            data.planType,
            data.status,
            new Date(data.startDate),
            new Date(data.endDate),
            data.autoRenew,
            data.price,
            new Date(data.createdAt),
            new Date(data.updatedAt)
        );
    }
}