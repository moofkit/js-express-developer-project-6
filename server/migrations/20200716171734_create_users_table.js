// @ts-check

export const up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('password_digest');
    table.string('firstname');
    table.string('lastname');
  })
);

export const down = (knex) => knex.schema.dropTable('users');
