import { randomUUID } from "node:crypto";
import { formatDateDisplay } from "./utils/format-date-display.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";
import { create } from "node:domain";

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

      const taskList = database.select("tasks", task ? {
        title: task,
        description: task,
        create_at: formatDateDisplay(tasks),
        update_at: formatDateDisplay(tasks),
        completed_at: formatDateDisplay(tasks),
      } : null);

      return res.end(JSON.stringify(taskList));
    },
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      database.update("tasks", id, {
        title,
        description,
      });

      return res.writeHead(204).end();
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
];

// Pesquisar sobre como funciona
//   {
//     method: "PATCH",
//     path: buildRoutePath("/tasks/:id/complete"),
//     handler: (req, res) => {},
//   },
