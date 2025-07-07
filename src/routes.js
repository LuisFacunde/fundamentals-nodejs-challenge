import { randomUUID } from "node:crypto";
import { formatDateDisplay } from "./utils/format-date-display.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        update_at: new Date(),
        completed_at: null,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },

  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { task } = req.query;

      const taskList = database.select(
        "tasks",
        task
          ? {
              title: task,
              description: task,
            }
          : null
      );

      return res.end(JSON.stringify(taskList));
    },
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      console.log("PUT chamado para id:", req.params.id);

      database.update("tasks", id, {
        title,
        description,
        update_at: new Date(), // Atualiza a data de modificação
      });

      return res.writeHead(204).end();
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      console.log("DELETE chamado para id:", req.params.id);

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {},
  },
];
