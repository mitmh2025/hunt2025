import { type Knex } from "knex";

export function generatedPrimaryKey(
  knex: Knex,
  table: Knex.CreateTableBuilder,
  columnName: string,
) {
  const driverName = (knex.client as Knex.Client).driverName;
  switch (driverName) {
    case "pg":
    case "pgnative":
      table.specificType(
        columnName,
        "int PRIMARY KEY GENERATED ALWAYS AS IDENTITY",
      );
      break;
    case "sqlite3":
    case "better-sqlite3":
      table.increments(columnName);
      break;
    default:
      throw new Error(
        `Unknown if ${driverName} supports generated identity primary keys`,
      );
  }
  return table;
}
