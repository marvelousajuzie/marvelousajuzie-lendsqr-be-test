"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('wallets', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.decimal('balance', 15, 2).defaultTo(0.00).notNullable();
        table.string('currency', 3).defaultTo('NGN').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.index('user_id');
        table.unique('user_id');
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists('wallets');
}
//# sourceMappingURL=20250120000002_create_wallets_table.js.map