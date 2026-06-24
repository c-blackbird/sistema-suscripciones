"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppNotifier = void 0;
class WhatsAppNotifier {
    async simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async send(to, subject, message) {
        console.log(`\n[whatsapp] sending to: ${to}`);
        console.log(`   message: ${message}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(400);
    }
    getType() {
        return 'whatsapp';
    }
}
exports.WhatsAppNotifier = WhatsAppNotifier;
//# sourceMappingURL=WhatsAppNotifier.js.map