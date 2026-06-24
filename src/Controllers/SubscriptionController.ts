// src/Controllers/SubscriptionController.ts
import { SubscriptionService } from '../Services/SubscriptionService';
import { PaymentService } from '../Services/PaymentService';
import { PlanType } from '../Models/Subscription';
import { UserService } from '../Services/UserService';

export class SubscriptionController {
    private subscriptionService: SubscriptionService;
    private paymentService: PaymentService;
    private userService: UserService;

    constructor(
        subscriptionService: SubscriptionService,
        paymentService: PaymentService,
        userService: UserService
    ) {
        this.subscriptionService = subscriptionService;
        this.paymentService = paymentService;
        this.userService = userService;
    }

    async createSubscription(userId: string, planType: PlanType): Promise<any> {
        try {
            const subscription = await this.subscriptionService.createSubscription(userId, planType);
            
            const paymentData = await this.paymentService.processPayment(
                userId,
                subscription.id,
                subscription.price,
                'credit_card'
            );

            return {
                subscription,
                payment: paymentData,
                success: true
            };
        } catch (error) {
            console.error(`error in subscriptioncontroller:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'unknown error'
            };
        }
    }

    async getUserSubscriptions(userId: string): Promise<any> {
        try {
            const subscriptions = await this.subscriptionService.getUserSubscriptions(userId);
            return {
                success: true,
                subscriptions
            };
        } catch (error) {
            console.error(`error getting subscriptions:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'unknown error'
            };
        }
    }

    async cancelSubscription(subscriptionId: string): Promise<any> {
        try {
            const result = await this.subscriptionService.cancelSubscription(subscriptionId);
            return {
                success: result,
                message: result ? 'subscription cancelled successfully' : 'error cancelling subscription'
            };
        } catch (error) {
            console.error(`error cancelling subscription:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'unknown error'
            };
        }
    }
}