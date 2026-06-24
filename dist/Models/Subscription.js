"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = exports.PLAN_DETAILS = exports.PlanType = exports.SubscriptionStatus = void 0;
// src/Models/Subscription.ts
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["CANCELLED"] = "cancelled";
    SubscriptionStatus["PENDING"] = "pending";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var PlanType;
(function (PlanType) {
    PlanType["FREE"] = "free";
    PlanType["BASIC"] = "basic";
    PlanType["PREMIUM"] = "premium";
    PlanType["ENTERPRISE"] = "enterprise";
})(PlanType || (exports.PlanType = PlanType = {}));
exports.PLAN_DETAILS = {
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
class Subscription {
    constructor(id, userId, planType, status, startDate, endDate, autoRenew = true, price = exports.PLAN_DETAILS[planType].price, createdAt = new Date(), updatedAt = new Date()) {
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
    isActive() {
        return this.status === SubscriptionStatus.ACTIVE && this.endDate > new Date();
    }
    isExpiringSoon(daysThreshold = 7) {
        if (!this.isActive())
            return false;
        const now = new Date();
        const daysUntilExpiry = Math.ceil((this.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
    }
    renew() {
        const newEndDate = new Date(this.endDate);
        newEndDate.setDate(newEndDate.getDate() + 30);
        this.endDate = newEndDate;
        this.updatedAt = new Date();
        this.status = SubscriptionStatus.ACTIVE;
    }
    cancel() {
        this.status = SubscriptionStatus.CANCELLED;
        this.updatedAt = new Date();
    }
    getDaysRemaining() {
        if (!this.isActive())
            return 0;
        return Math.ceil((this.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    }
    getTotalCost() {
        return this.price;
    }
    getFeatures() {
        return exports.PLAN_DETAILS[this.planType].features;
    }
    toJSON() {
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
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map