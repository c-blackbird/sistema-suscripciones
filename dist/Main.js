"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
// src/Main.ts
const DatabaseConnection_1 = require("./Config/DatabaseConnection");
const UserRepository_1 = require("./Repositories/UserRepository");
const SubscriptionRepository_1 = require("./Repositories/SubscriptionRepository");
const UserService_1 = require("./Services/UserService");
const SubscriptionService_1 = require("./Services/SubscriptionService");
const PaymentService_1 = require("./Services/PaymentService");
const SubscriptionController_1 = require("./Controllers/SubscriptionController");
const Subscription_1 = require("./Models/Subscription");
const EmailNotificationObserver_1 = require("./Observers/EmailNotificationObserver");
const MetricsServiceObserver_1 = require("./Observers/MetricsServiceObserver");
const AccessControlObserver_1 = require("./Observers/AccessControlObserver");
class Main {
    constructor() {
        console.log('starting premium subscription system...\n');
        this.db = DatabaseConnection_1.DatabaseConnection.getInstance();
        this.userRepository = new UserRepository_1.UserRepository();
        this.subscriptionRepository = new SubscriptionRepository_1.SubscriptionRepository();
        this.userService = new UserService_1.UserService(this.userRepository);
        this.subscriptionService = new SubscriptionService_1.SubscriptionService(this.subscriptionRepository);
        this.paymentService = new PaymentService_1.PaymentService();
        this.setupObservers();
        this.subscriptionController = new SubscriptionController_1.SubscriptionController(this.subscriptionService, this.paymentService, this.userService);
    }
    setupObservers() {
        console.log('configuring observers...\n');
        const emailObserver = new EmailNotificationObserver_1.EmailNotificationObserver();
        const metricsObserver = new MetricsServiceObserver_1.MetricsServiceObserver();
        const accessObserver = new AccessControlObserver_1.AccessControlObserver();
        this.paymentService.attachObserver(emailObserver);
        this.paymentService.attachObserver(metricsObserver);
        this.paymentService.attachObserver(accessObserver);
        console.log('observers configured successfully\n');
    }
    async run() {
        try {
            console.log('=== system demonstration ===\n');
            console.log('step 1: registering user...');
            const user = await this.userService.register({
                name: 'juan perez',
                email: 'juan.perez@example.com',
                password: 'password123',
                preferences: {
                    notificationChannel: 'email',
                    language: 'en',
                    timezone: 'America/Santiago',
                    receiveMarketingEmails: true
                }
            });
            console.log('user registered successfully\n');
            console.log('step 2: creating premium subscription...');
            const result = await this.subscriptionController.createSubscription(user.id, Subscription_1.PlanType.PREMIUM);
            if (!result.success) {
                throw new Error(result.error || 'error creating subscription');
            }
            console.log('subscription created successfully\n');
            console.log('step 3: database status:');
            this.db.showStatus();
            console.log('step 4: subscription details:');
            const subscriptions = await this.subscriptionService.getUserSubscriptions(user.id);
            for (const sub of subscriptions) {
                console.log(`   plan: ${sub.planType}`);
                console.log(`   price: $${sub.price.toFixed(2)}`);
                console.log(`   start: ${sub.startDate.toLocaleDateString()}`);
                console.log(`   end: ${sub.endDate.toLocaleDateString()}`);
                console.log(`   status: ${sub.status}`);
                console.log(`   auto renewal: ${sub.autoRenew ? 'yes' : 'no'}`);
                console.log(`   days remaining: ${sub.getDaysRemaining()}`);
                console.log('   features:');
                const features = sub.getFeatures();
                for (const feature of features) {
                    console.log(`      - ${feature}`);
                }
                console.log('');
            }
            console.log('step 5: system metrics:');
            const metricsObserver = this.paymentService['paymentSubject']['observers']
                .find((obs) => obs instanceof MetricsServiceObserver_1.MetricsServiceObserver);
            if (metricsObserver) {
                const metrics = metricsObserver.getMetrics();
                console.log(`   total revenue: $${metrics.totalRevenue.toFixed(2)}`);
                console.log(`   total transactions: ${metrics.totalTransactions}`);
                console.log(`   payments by method:`, metrics.transactionsByMethod);
            }
            console.log('\nstep 6: verifying premium access:');
            const activeSub = await this.subscriptionService.getActiveSubscription(user.id);
            if (activeSub) {
                console.log(`   user has premium access`);
                console.log(`   plan: ${activeSub.planType}`);
                console.log(`   expires: ${activeSub.endDate.toLocaleDateString()}`);
            }
            else {
                console.log(`   user does not have premium access`);
            }
            console.log('\n=== demonstration completed successfully ===\n');
        }
        catch (error) {
            console.error('error in execution:', error);
            console.error('details:', error.stack);
        }
    }
}
exports.Main = Main;
exports.default = Main;
//# sourceMappingURL=Main.js.map