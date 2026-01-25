"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.string('id', 36).primary();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('phone_number', 20).notNullable().unique();
        table.boolean('is_blacklisted').defaultTo(false);
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('users');
}
//# sourceMappingURL=20240120000001_create_users_table.js.map