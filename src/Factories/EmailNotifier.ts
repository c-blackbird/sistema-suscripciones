// src/Factories/EmailNotifier.ts
import { INotifier } from './Interfaces/INotifier';

export class EmailNotifier implements INotifier {
    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async send(to: string, subject: string, message: string): Promise<void> {
        console.log(`\n[email] sending to: ${to}`);
        console.log(`   subject: ${subject}`);
        console.log(`   message:`);
        console.log(`   ${'-'.repeat(50)}`);
        console.log(message);
        console.log(`   ${'-'.repeat(50)}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(500);
    }

    getType(): string {
        return 'email';
    }
}