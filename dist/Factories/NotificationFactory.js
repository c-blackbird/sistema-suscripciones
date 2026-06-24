"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFactory = void 0;
const EmailNotifier_1 = require("./EmailNotifier");
const SMSNotifier_1 = require("./SMSNotifier");
const PushNotifier_1 = require("./PushNotifier");
const WhatsAppNotifier_1 = require("./WhatsAppNotifier");
class NotificationFactory {
    constructor() {
        this.notifierCache = new Map();
        console.log('notification factory initialized');
    }
    static getInstance() {
        if (!NotificationFactory.instance) {
            NotificationFactory.instance = new NotificationFactory();
        }
        return NotificationFactory.instance;
    }
    createNotifier(channel) {
        if (this.notifierCache.has(channel)) {
            console.log(`reusing notifier: ${channel}`);
            return this.notifierCache.get(channel);
        }
        let notifier;
        switch (channel.toLowerCase()) {
            case 'email':
                notifier = new EmailNotifier_1.EmailNotifier();
                break;
            case 'sms':
                notifier = new SMSNotifier_1.SMSNotifier();
                break;
            case 'push':
                notifier = new PushNotifier_1.PushNotifier();
                break;
            case 'whatsapp':
                notifier = new WhatsAppNotifier_1.WhatsAppNotifier();
                break;
            default:
                throw new Error(`notification channel not supported: ${channel}`);
        }
        this.notifierCache.set(channel, notifier);
        console.log(`new notifier created: ${channel}`);
        return notifier;
    }
    createNotifiers(channels) {
        return channels.map(channel => this.createNotifier(channel));
    }
    registerNotifier(channel, notifierClass) {
        const notifier = new notifierClass();
        this.notifierCache.set(channel, notifier);
        console.log(`new channel registered: ${channel}`);
    }
}
exports.NotificationFactory = NotificationFactory;
//# sourceMappingURL=NotificationFactory.js.map