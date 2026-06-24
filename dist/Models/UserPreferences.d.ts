export interface UserPreferences {
    notificationChannel: 'email' | 'sms' | 'push' | 'whatsapp';
    language: string;
    timezone: string;
    receiveMarketingEmails: boolean;
}
export declare const defaultPreferences: UserPreferences;
