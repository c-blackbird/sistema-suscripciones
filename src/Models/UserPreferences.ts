// src/Models/UserPreferences.ts
export interface UserPreferences {
    notificationChannel: 'email' | 'sms' | 'push' | 'whatsapp';
    language: string;
    timezone: string;
    receiveMarketingEmails: boolean;
}

export const defaultPreferences: UserPreferences = {
    notificationChannel: 'email',
    language: 'es',
    timezone: 'America/Santiago',
    receiveMarketingEmails: true
};