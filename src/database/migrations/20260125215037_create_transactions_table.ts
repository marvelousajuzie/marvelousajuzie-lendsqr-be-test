import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table.uuid('wallet_id').notNullable();
    table.enum('transaction_type', ['credit', 'debit']).notNullable();
    table.decimal('amount', 15, 2).notNullable();
    table.string('reference', 255).notNullable().unique();
    table.string('description', 500);
    table.enum('status', ['pending', 'success', 'failed']).defaultTo('pending');
    table.json('metadata');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.foreign('wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('transactions');
}