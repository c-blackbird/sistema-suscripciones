"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSubject = void 0;
class PaymentSubject {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`observer attached: ${observer.constructor.name}`);
        }
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
            console.log(`observer detached: ${observer.constructor.name}`);
        }
    }
    async notify(data) {
        console.log(`\nnotifying ${this.observers.length} observers...`);
        const promises = this.observers.map(async (observer) => {
            try {
                await observer.update(data);
                console.log(`${observer.constructor.name} processed`);
            }
            catch (error) {
                console.error(`error in ${observer.constructor.name}:`, error);
            }
        });
        await Promise.all(promises);
        console.log(`notifications completed\n`);
    }
    getObserverCount() {
        return this.observers.length;
    }
}
exports.PaymentSubject = PaymentSubject;
//# sourceMappingURL=PaymentSubject.js.map