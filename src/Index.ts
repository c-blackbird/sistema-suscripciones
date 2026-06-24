// src/Index.ts
import { Main } from './Main';

console.log('premium subscription system');
console.log('====================================\n');

const app = new Main();

app.run().catch((error: Error) => {
    console.error('fatal error:', error.message);
    console.error('details:', error);
    process.exit(1);
});