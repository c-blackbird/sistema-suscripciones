export declare enum SubscriptionStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    CANCELLED = "cancelled",
    PENDING = "pending"
}
export declare enum PlanType {
    FREE = "free",
    BASIC = "basic",
    PREMIUM = "premium",
    ENTERPRISE = "enterprise"
}
export interface PlanDetails {
    name: PlanType;
    price: number;
    duration: number;
    features: string[];
}
export declare const PLAN_DETAILS: Record<PlanType, PlanDetails>;
export declare class Subscription {
    id: string;
    userId: string;
    planType: PlanType;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: string, userId: string, planType: PlanType, status: SubscriptionStatus, startDate: Date, endDate: Date, autoRenew?: boolean, price?: number, createdAt?: Date, updatedAt?: Date);
    isActive(): boolean;
    isExpiringSoon(daysThreshold?: number): boolean;
    renew(): void;
    cancel(): void;
    getDaysRemaining(): number;
    getTotalCost(): number;
    getFeatures(): string[];
    toJSON(): any;
}
