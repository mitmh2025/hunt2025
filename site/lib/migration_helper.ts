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

export function jsonPathValue(knex: Knex, column: string, path: string[]) {
  const driverName = (knex.client as Knex.Client).driverName;
  switch (driverName) {
    case "sqlite3":
    case "better-sqlite3":
    case "pg":
    case "pgnative":
      return knex.raw(
        `(??${path.slice(0, -1).map((p) => ` -> '${p}'`)} ->> '${path.at(-1)}')`,
        [column],
      );
      break;
    default:
      throw new Error(`${driverName} does not have a string_agg function`);
  }
}
