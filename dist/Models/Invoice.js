"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = exports.InvoiceStatus = void 0;
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["UNPAID"] = "unpaid";
    InvoiceStatus["CANCELLED"] = "cancelled";
    InvoiceStatus["PENDING"] = "pending";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
class Invoice {
    constructor(id, subscriptionId, userId, amount, status, dueDate, paidAt = null, items = [], createdAt = new Date()) {
        this.id = id;
        this.subscriptionId = subscriptionId;
        this.userId = userId;
        this.amount = amount;
        this.status = status;
        this.dueDate = dueDate;
        this.paidAt = paidAt;
        this.items = items;
        this.createdAt = createdAt;
    }
    markAsPaid() {
        this.status = InvoiceStatus.PAID;
        this.paidAt = new Date();
    }
    cancel() {
        this.status = InvoiceStatus.CANCELLED;
    }
    addItem(item) {
        this.items.push(item);
        this.amount += item.getTotal();
    }
    toJSON() {
        return {
            id: this.id,
            subscriptionId: this.subscriptionId,
            userId: this.userId,
            amount: this.amount,
            status: this.status,
            dueDate: this.dueDate,
            paidAt: this.paidAt,
            items: this.items.map(item => item.toJSON()),
            createdAt: this.createdAt
        };
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=Invoice.js.map