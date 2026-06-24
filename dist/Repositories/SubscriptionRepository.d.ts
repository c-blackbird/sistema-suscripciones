import { ISubscriptionRepository } from './Interfaces/ISubscriptionRepository';
import { Subscription } from '../Models/Subscription';
export declare class SubscriptionRepository implements ISubscriptionRepository {
    private db;
    private collectionName;
    constructor();
    findById(id: string): Promise<Subscription | null>;
    findByUserId(userId: string): Promise<Subscription[]>;
    create(subscription: Subscription): Promise<Subscription>;
    update(id: string, subscription: Partial<Subscription>): Promise<Subscription | null>;
    delete(id: string): Promise<boolean>;
    findActiveByUserId(userId: string): Promise<Subscription | null>;
    findExpiringSoon(daysThreshold?: number): Promise<Subscription[]>;
    findAll(): Promise<Subscription[]>;
    private mapToSubscription;
}
