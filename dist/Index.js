"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/Index.ts
const Main_1 = require("./Main");
console.log('premium subscription system');
console.log('====================================\n');
const app = new Main_1.Main();
app.run().catch((error) => {
    console.error('fatal error:', error.message);
    console.error('details:', error);
    process.exit(1);
});
//# sourceMappingURL=Index.js.map