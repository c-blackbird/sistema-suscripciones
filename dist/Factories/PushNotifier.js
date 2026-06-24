"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotifier = void 0;
class PushNotifier {
    async simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async send(to, subject, message) {
        console.log(`\n[push] sending to: ${to}`);
        console.log(`   title: ${subject}`);
        console.log(`   message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(200);
    }
    getType() {
        return 'push';
    }
}
exports.PushNotifier = PushNotifier;
//# sourceMappingURL=PushNotifier.js.map