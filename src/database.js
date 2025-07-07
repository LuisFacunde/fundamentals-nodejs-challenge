import fs from "node:fs/promises";

const databasePath = new URL("..db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.persist();
      });
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, task) {
    let data = this.#database[table] ?? [];

    if (task) {
      data = data.filter((row) => {
        return Object.entries(task).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, task) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(task);
    } else {
      this.#database[table] = [task];
    }

    this.persist();

    return task;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.persist();
    }
  }
}
