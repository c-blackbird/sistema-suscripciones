// src/Factories/Interfaces/INotifier.ts
export interface INotifier {
    send(to: string, subject: string, message: string): Promise<void>;
    getType(): string;
}