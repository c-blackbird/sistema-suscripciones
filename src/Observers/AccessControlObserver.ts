// src/Observers/AccessControlObserver.ts
import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';
import { SubscriptionRepository } from '../Repositories/SubscriptionRepository';
import { SubscriptionStatus } from '../Models/Subscription';

export class AccessControlObserver implements IObserver {
    private subscriptionRepository: SubscriptionRepository;

    constructor() {
        this.subscriptionRepository = new SubscriptionRepository();
    }

    async update(data: PaymentData): Promise<void> {
        try {
            console.log(`\n[accesscontrolobserver] processing access...`);

            const subscription = await this.subscriptionRepository.findById(data.subscriptionId);
            if (!subscription) {
                console.log(`subscription ${data.subscriptionId} not found`);
                return;
            }

            subscription.status = SubscriptionStatus.ACTIVE;
            subscription.updatedAt = new Date();
            
            if (subscription.isExpiringSoon()) {
                const currentEnd = subscription.endDate;
                const newEnd = new Date(currentEnd);
                newEnd.setMonth(newEnd.getMonth() + 1);
                subscription.endDate = newEnd;
                console.log(`subscription renewed for 1 month`);
            }

            await this.subscriptionRepository.update(subscription.id, subscription);

            console.log(`premium access activated for user ${data.userId}`);
            console.log(`   plan: ${subscription.planType}`);
            console.log(`   valid until: ${subscription.endDate.toLocaleDateString()}`);
            console.log(`   auto renewal: ${subscription.autoRenew ? 'active' : 'inactive'}`);
            console.log(`access granted successfully`);

        } catch (error) {
            console.error(`error in accesscontrolobserver:`, error);
            throw error;
        }
    }
}