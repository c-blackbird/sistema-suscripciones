// src/Observers/PaymentSubject.ts
import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';

export class PaymentSubject {
    private observers: IObserver[] = [];

    public attach(observer: IObserver): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`observer attached: ${observer.constructor.name}`);
        }
    }

    public detach(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
            console.log(`observer detached: ${observer.constructor.name}`);
        }
    }

    public async notify(data: PaymentData): Promise<void> {
        console.log(`\nnotifying ${this.observers.length} observers...`);
        
        const promises = this.observers.map(async (observer) => {
            try {
                await observer.update(data);
                console.log(`${observer.constructor.name} processed`);
            } catch (error) {
                console.error(`error in ${observer.constructor.name}:`, error);
            }
        });

        await Promise.all(promises);
        console.log(`notifications completed\n`);
    }

    public getObserverCount(): number {
        return this.observers.length;
    }
}