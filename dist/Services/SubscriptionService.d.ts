import { ISubscriptionRepository } from '../Repositories/Interfaces/ISubscriptionRepository';
import { Subscription, PlanType } from '../Models/Subscription';
export declare class SubscriptionService {
    private subscriptionRepository;
    constructor(subscriptionRepository: ISubscriptionRepository);
    createSubscription(userId: string, planType: PlanType): Promise<Subscription>;
    cancelSubscription(subscriptionId: string): Promise<boolean>;
    getUserSubscriptions(userId: string): Promise<Subscription[]>;
    getActiveSubscription(userId: string): Promise<Subscription | null>;
    getAllSubscriptions(): Promise<Subscription[]>;
    processRenewals(): Promise<void>;
}
