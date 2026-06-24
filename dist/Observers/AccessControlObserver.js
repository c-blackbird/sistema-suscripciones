"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlObserver = void 0;
const SubscriptionRepository_1 = require("../Repositories/SubscriptionRepository");
const Subscription_1 = require("../Models/Subscription");
class AccessControlObserver {
    constructor() {
        this.subscriptionRepository = new SubscriptionRepository_1.SubscriptionRepository();
    }
    async update(data) {
        try {
            console.log(`\n[accesscontrolobserver] processing access...`);
            const subscription = await this.subscriptionRepository.findById(data.subscriptionId);
            if (!subscription) {
                console.log(`subscription ${data.subscriptionId} not found`);
                return;
            }
            subscription.status = Subscription_1.SubscriptionStatus.ACTIVE;
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
        }
        catch (error) {
            console.error(`error in accesscontrolobserver:`, error);
            throw error;
        }
    }
}
exports.AccessControlObserver = AccessControlObserver;
//# sourceMappingURL=AccessControlObserver.js.map