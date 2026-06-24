"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/test-factory.ts
const NotificationFactory_1 = require("./Factories/NotificationFactory");
async function testFactory() {
    console.log('\n🧪 Probando NotificationFactory...\n');
    const factory = NotificationFactory_1.NotificationFactory.getInstance();
    // Probar diferentes canales
    const channels = ['email', 'sms', 'push', 'whatsapp'];
    for (const channel of channels) {
        try {
            console.log(`\n📨 Probando canal: ${channel}`);
            const notifier = factory.createNotifier(channel);
            await notifier.send('test@example.com', `Prueba ${channel}`, `Este es un mensaje de prueba para el canal ${channel}`);
            console.log(`✅ Canal ${channel} funciona correctamente`);
        }
        catch (error) {
            console.error(`❌ Error con canal ${channel}:`, error);
        }
    }
    console.log('\n✅ Prueba completada\n');
}
testFactory().catch(console.error);
//# sourceMappingURL=test-factory.js.map