"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const Subscription_1 = require("../Models/Subscription");
const crypto_1 = require("crypto");
class SubscriptionService {
    constructor(subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }
    async createSubscription(userId, planType) {
        try {
            console.log(`\n[subscriptionservice] creating subscription...`);
            const activeSubscription = await this.subscriptionRepository.findActiveByUserId(userId);
            if (activeSubscription) {
                throw new Error(`user already has an active subscription: ${activeSubscription.planType}`);
            }
            const planDetails = Subscription_1.PLAN_DETAILS[planType];
            const subscription = new Subscription_1.Subscription((0, crypto_1.randomUUID)(), userId, planType, Subscription_1.SubscriptionStatus.PENDING, new Date(), new Date(Date.now() + planDetails.duration * 24 * 60 * 60 * 1000), true, planDetails.price);
            await this.subscriptionRepository.create(subscription);
            console.log(`subscription created successfully:`);
            console.log(`   plan: ${planType}`);
            console.log(`   price: $${planDetails.price.toFixed(2)}`);
            console.log(`   duration: ${planDetails.duration} days`);
            console.log(`   id: ${subscription.id}`);
            return subscription;
        }
        catch (error) {
            console.error(`error creating subscription:`, error);
            throw error;
        }
    }
    async cancelSubscription(subscriptionId) {
        try {
            const subscription = await this.subscriptionRepository.findById(subscriptionId);
            if (!subscription) {
                throw new Error(`subscription ${subscriptionId} not found`);
            }
            subscription.cancel();
            await this.subscriptionRepository.update(subscriptionId, subscription);
            console.log(`subscription cancelled: ${subscriptionId}`);
            return true;
        }
        catch (error) {
            console.error(`error cancelling subscription:`, error);
            throw error;
        }
    }
    async getUserSubscriptions(userId) {
        return this.subscriptionRepository.findByUserId(userId);
    }
    async getActiveSubscription(userId) {
        return this.subscriptionRepository.findActiveByUserId(userId);
    }
    async getAllSubscriptions() {
        return this.subscriptionRepository.findAll();
    }
    async processRenewals() {
        try {
            console.log(`\n[subscriptionservice] processing renewals...`);
            const expiringSubscriptions = await this.subscriptionRepository.findExpiringSoon(7);
            for (const subscription of expiringSubscriptions) {
                if (subscription.autoRenew) {
                    subscription.renew();
                    await this.subscriptionRepository.update(subscription.id, subscription);
                    console.log(`subscription renewed: ${subscription.id}`);
                }
                else {
                    console.log(`subscription expiring soon (no auto-renewal): ${subscription.id}`);
                }
            }
            console.log(`renewal processing completed`);
        }
        catch (error) {
            console.error(`error processing renewals:`, error);
            throw error;
        }
    }
}
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=SubscriptionService.js.map