"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = void 0;
// src/Models/InvoiceItem.ts
class InvoiceItem {
    constructor(description, amount, quantity = 1) {
        this.description = description;
        this.amount = amount;
        this.quantity = quantity;
    }
    getTotal() {
        return this.amount * this.quantity;
    }
    toJSON() {
        return {
            description: this.description,
            amount: this.amount,
            quantity: this.quantity,
            total: this.getTotal()
        };
    }
}
exports.InvoiceItem = InvoiceItem;
//# sourceMappingURL=InvoiceItem.js.map