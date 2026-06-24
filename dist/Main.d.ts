export declare class Main {
    private db;
    private userRepository;
    private subscriptionRepository;
    private userService;
    private subscriptionService;
    private paymentService;
    private subscriptionController;
    constructor();
    private setupObservers;
    run(): Promise<void>;
}
export default Main;
