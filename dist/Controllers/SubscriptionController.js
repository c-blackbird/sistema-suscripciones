"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
class SubscriptionController {
    constructor(subscriptionService, paymentService, userService) {
        this.subscriptionService = subscriptionService;
        this.paymentService = paymentService;
        this.userService = userService;
    }
    async createSubscription(userId, planType) {
        try {
            const subscription = await this.subscriptionService.createSubscription(userId, planType);
            const paymentData = await this.paymentService.processPayment(userId, subscription.id, subscription.price, 'credit_card');
            return {
                subscription,
                payment: paymentData,
                success: true
            };
        }
        catch (error) {
            console.error(`error in subscriptioncontroller:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'unknown error'
            };
        }
    }
    async getUserSubscriptions(userId) {
        try {
            const subscriptions = await this.subscriptionService.getUserSubscriptions(userId);
            return {
                success: true,
                subscriptions
            };
        }
        catch (error) {
            console.error(`error getting subscriptions:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'unknown error'
            };
        }
    }
    async cancelSubscription(subscriptionId) {
        try {
            const result = await this.subscriptionService.cancelSubscription(subscriptionId);
            return {
                success: result,
                message: result ? 'subscription cancelled successfully' : 'error cancelling subscription'
            };
        }
        catch (error) {
            console.error(`error cancelling subscription:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'unknown error'
            };
        }
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=SubscriptionController.js.map