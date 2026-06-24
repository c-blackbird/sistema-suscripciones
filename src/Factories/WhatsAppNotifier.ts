// src/Factories/WhatsAppNotifier.ts
import { INotifier } from './Interfaces/INotifier';

export class WhatsAppNotifier implements INotifier {
    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async send(to: string, subject: string, message: string): Promise<void> {
        console.log(`\n[whatsapp] sending to: ${to}`);
        console.log(`   message: ${message}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(400);
    }

    getType(): string {
        return 'whatsapp';
    }
}