// src/Main.ts
import { DatabaseConnection } from './Config/DatabaseConnection';
import { UserRepository } from './Repositories/UserRepository';
import { SubscriptionRepository } from './Repositories/SubscriptionRepository';
import { UserService } from './Services/UserService';
import { SubscriptionService } from './Services/SubscriptionService';
import { PaymentService } from './Services/PaymentService';
import { SubscriptionController } from './Controllers/SubscriptionController';
import { PlanType } from './Models/Subscription';
import { EmailNotificationObserver } from './Observers/EmailNotificationObserver';
import { MetricsServiceObserver } from './Observers/MetricsServiceObserver';
import { AccessControlObserver } from './Observers/AccessControlObserver';

export class Main {
    private db: DatabaseConnection;
    private userRepository: UserRepository;
    private subscriptionRepository: SubscriptionRepository;
    private userService: UserService;
    private subscriptionService: SubscriptionService;
    private paymentService: PaymentService;
    private subscriptionController: SubscriptionController;

    constructor() {
        console.log('starting premium subscription system...\n');
        
        this.db = DatabaseConnection.getInstance();
        this.userRepository = new UserRepository();
        this.subscriptionRepository = new SubscriptionRepository();
        this.userService = new UserService(this.userRepository);
        this.subscriptionService = new SubscriptionService(this.subscriptionRepository);
        this.paymentService = new PaymentService();
        
        this.setupObservers();
        
        this.subscriptionController = new SubscriptionController(
            this.subscriptionService,
            this.paymentService,
            this.userService
        );
    }

    private setupObservers(): void {
        console.log('configuring observers...\n');
        
        const emailObserver = new EmailNotificationObserver();
        const metricsObserver = new MetricsServiceObserver();
        const accessObserver = new AccessControlObserver();
        
        this.paymentService.attachObserver(emailObserver);
        this.paymentService.attachObserver(metricsObserver);
        this.paymentService.attachObserver(accessObserver);
        
        console.log('observers configured successfully\n');
    }

    async run(): Promise<void> {
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
            const result = await this.subscriptionController.createSubscription(user.id, PlanType.PREMIUM);
            
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
                .find((obs: any) => obs instanceof MetricsServiceObserver) as MetricsServiceObserver;
            
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
            } else {
                console.log(`   user does not have premium access`);
            }

            console.log('\n=== demonstration completed successfully ===\n');

        } catch (error: any) {
            console.error('error in execution:', error);
            console.error('details:', error.stack);
        }
    }
}

export default Main;