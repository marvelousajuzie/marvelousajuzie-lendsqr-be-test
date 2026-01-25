"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('wallets', (table) => {
        table.string('id', 36).primary();
        table.string('user_id', 36).notNullable().unique();
        table.decimal('balance', 15, 2).notNullable().defaultTo(0);
        table.string('currency', 3).notNullable().defaultTo('NGN');
        table.timestamps(true, true);
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}
async function down(knex) {
    return knex.schema.dropTable('wallets');
}
//# sourceMappingURL=20240120000002_create_wallets_table.js.map