import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.string('id', 36).primary();
    table.string('wallet_id', 36).notNullable();
    table.string('transaction_type', 20).notNullable();
    table.decimal('amount', 15, 2).notNullable();
    table.string('reference', 100).notNullable().unique();
    table.text('description').nullable();
    table.string('status', 20).notNullable().defaultTo('pending');
    table.json('metadata').nullable();
    table.string('recipient_wallet_id', 36).nullable();
    table.timestamps(true, true);
    
    table.foreign('wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
    table.foreign('recipient_wallet_id').references('id').inTable('wallets').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
