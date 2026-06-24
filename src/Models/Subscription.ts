// src/Models/Subscription.ts
export enum SubscriptionStatus {
    ACTIVE = 'active',
    EXPIRED = 'expired',
    CANCELLED = 'cancelled',
    PENDING = 'pending'
}

export enum PlanType {
    FREE = 'free',
    BASIC = 'basic',
    PREMIUM = 'premium',
    ENTERPRISE = 'enterprise'
}

export interface PlanDetails {
    name: PlanType;
    price: number;
    duration: number;
    features: string[];
}

export const PLAN_DETAILS: Record<PlanType, PlanDetails> = {
    [PlanType.FREE]: {
        name: PlanType.FREE,
        price: 0,
        duration: 30,
        features: ['basic access', 'email support', '1 project']
    },
    [PlanType.BASIC]: {
        name: PlanType.BASIC,
        price: 9.99,
        duration: 30,
        features: ['basic access', 'priority support', '5 projects', 'storage 5gb']
    },
    [PlanType.PREMIUM]: {
        name: PlanType.PREMIUM,
        price: 29.99,
        duration: 30,
        features: ['full access', '24/7 support', 'unlimited projects', 'storage 50gb', 'advanced analytics']
    },
    [PlanType.ENTERPRISE]: {
        name: PlanType.ENTERPRISE,
        price: 99.99,
        duration: 30,
        features: ['premium features', 'dedicated support', 'custom api', 'unlimited storage', 'advanced security']
    }
};

export class Subscription {
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

    constructor(
        id: string,
        userId: string,
        planType: PlanType,
        status: SubscriptionStatus,
        startDate: Date,
        endDate: Date,
        autoRenew: boolean = true,
        price: number = PLAN_DETAILS[planType].price,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.userId = userId;
        this.planType = planType;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.autoRenew = autoRenew;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public isActive(): boolean {
        return this.status === SubscriptionStatus.ACTIVE && this.endDate > new Date();
    }

    public isExpiringSoon(daysThreshold: number = 7): boolean {
        if (!this.isActive()) return false;
        const now = new Date();
        const daysUntilExpiry = Math.ceil((this.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
    }

    public renew(): void {
        const newEndDate = new Date(this.endDate);
        newEndDate.setDate(newEndDate.getDate() + 30);
        this.endDate = newEndDate;
        this.updatedAt = new Date();
        this.status = SubscriptionStatus.ACTIVE;
    }

    public cancel(): void {
        this.status = SubscriptionStatus.CANCELLED;
        this.updatedAt = new Date();
    }

    public getDaysRemaining(): number {
        if (!this.isActive()) return 0;
        return Math.ceil((this.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    }

    public getTotalCost(): number {
        return this.price;
    }

    public getFeatures(): string[] {
        return PLAN_DETAILS[this.planType].features;
    }

    public toJSON(): any {
        return {
            id: this.id,
            userId: this.userId,
            planType: this.planType,
            status: this.status,
            startDate: this.startDate,
            endDate: this.endDate,
            autoRenew: this.autoRenew,
            price: this.price,
            daysRemaining: this.getDaysRemaining(),
            isActive: this.isActive(),
            features: this.getFeatures()
        };
    }
}