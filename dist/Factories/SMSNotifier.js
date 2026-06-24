"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSNotifier = void 0;
class SMSNotifier {
    async simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async send(to, subject, message) {
        console.log(`\n[sms] sending to: ${to}`);
        console.log(`   message: ${message.substring(0, 160)}${message.length > 160 ? '...' : ''}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(300);
    }
    getType() {
        return 'sms';
    }
}
exports.SMSNotifier = SMSNotifier;
//# sourceMappingURL=SMSNotifier.js.map