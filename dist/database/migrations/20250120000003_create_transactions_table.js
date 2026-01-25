"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.uuid('wallet_id').notNullable();
        table.enum('transaction_type', ['credit', 'debit']).notNullable();
        table.decimal('amount', 15, 2).notNullable();
        table.string('reference', 100).notNullable().unique();
        table.text('description');
        table.enum('status', ['pending', 'success', 'failed']).defaultTo('pending');
        table.json('metadata');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
        table.index('wallet_id');
        table.index('reference');
        table.index('status');
        table.index('created_at');
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists('transactions');
}
//# sourceMappingURL=20250120000003_create_transactions_table.js.map