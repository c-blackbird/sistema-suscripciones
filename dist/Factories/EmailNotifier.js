"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotifier = void 0;
class EmailNotifier {
    async simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async send(to, subject, message) {
        console.log(`\n[email] sending to: ${to}`);
        console.log(`   subject: ${subject}`);
        console.log(`   message:`);
        console.log(`   ${'-'.repeat(50)}`);
        console.log(message);
        console.log(`   ${'-'.repeat(50)}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(500);
    }
    getType() {
        return 'email';
    }
}
exports.EmailNotifier = EmailNotifier;
//# sourceMappingURL=EmailNotifier.js.map