import { SubscriptionService } from '../Services/SubscriptionService';
import { PaymentService } from '../Services/PaymentService';
import { PlanType } from '../Models/Subscription';
import { UserService } from '../Services/UserService';
export declare class SubscriptionController {
    private subscriptionService;
    private paymentService;
    private userService;
    constructor(subscriptionService: SubscriptionService, paymentService: PaymentService, userService: UserService);
    createSubscription(userId: string, planType: PlanType): Promise<any>;
    getUserSubscriptions(userId: string): Promise<any>;
    cancelSubscription(subscriptionId: string): Promise<any>;
}
