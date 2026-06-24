"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsServiceObserver = void 0;
const DatabaseConnection_1 = require("../Config/DatabaseConnection");
class MetricsServiceObserver {
    constructor() {
        this.db = DatabaseConnection_1.DatabaseConnection.getInstance();
        this.metrics = {
            totalRevenue: 0,
            totalTransactions: 0,
            transactionsByMethod: new Map(),
            dailyRevenue: new Map()
        };
    }
    async update(data) {
        try {
            console.log(`\n[metricsserviceobserver] updating metrics...`);
            this.metrics.totalRevenue += data.amount;
            this.metrics.totalTransactions++;
            const methodCount = this.metrics.transactionsByMethod.get(data.paymentMethod) || 0;
            this.metrics.transactionsByMethod.set(data.paymentMethod, methodCount + 1);
            const dateKey = data.timestamp.toDateString();
            const dayRevenue = this.metrics.dailyRevenue.get(dateKey) || 0;
            this.metrics.dailyRevenue.set(dateKey, dayRevenue + data.amount);
            console.log(`   total revenue: $${this.metrics.totalRevenue.toFixed(2)}`);
            console.log(`   total transactions: ${this.metrics.totalTransactions}`);
            console.log(`   transactions by method:`, Object.fromEntries(this.metrics.transactionsByMethod));
            this.db.insert('metrics', {
                timestamp: new Date(),
                metrics: {
                    totalRevenue: this.metrics.totalRevenue,
                    totalTransactions: this.metrics.totalTransactions,
                    transactionsByMethod: Object.fromEntries(this.metrics.transactionsByMethod),
                    dailyRevenue: Object.fromEntries(this.metrics.dailyRevenue)
                }
            });
            console.log(`metrics updated and saved`);
        }
        catch (error) {
            console.error(`error in metricsserviceobserver:`, error);
            throw error;
        }
    }
    getMetrics() {
        return {
            totalRevenue: this.metrics.totalRevenue,
            totalTransactions: this.metrics.totalTransactions,
            transactionsByMethod: Object.fromEntries(this.metrics.transactionsByMethod),
            dailyRevenue: Object.fromEntries(this.metrics.dailyRevenue)
        };
    }
}
exports.MetricsServiceObserver = MetricsServiceObserver;
//# sourceMappingURL=MetricsServiceObserver.js.map