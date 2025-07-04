import { randomUUID } from "node:crypto";
import { formatDateDisplay } from "./utils/format-date-display";
import { title } from "process";
import { create } from "domain";
import { upgrade } from "undici-types";
import { stringify } from "querystring";

export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
        completed_at: null,
      };

    //   database.insert("tasks", task)

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const { id } = req.params;

      const taskFromDB = database.find("tasks", id);

      const exibitionDisplayTask = {
        id: taskFromDB.id,
        title: taskFromDB.title,
        discription: taskFromDB.description,
        create_at: formatDateDisplay(new Date(taskFromDB.create_at)),
        upgrade_at: formatDateDisplay(new Date(taskFromDB.uptade_at)),
        completed_at: taskFromDB.completed_at
          ? formatDateDisplay(new Date(taskFromDB.completed_at))
          : null,
      };

      return res.end(JSON, stringify(exibitionDisplayTask));
    },
  },
  {
    method: "PUT",
    path: "/tasks/:id",
    handler: (req, res) => {},
  },
  {
    method: "DELETE",
    path: "/tasks/:id",
    handler: (req, res) => {},
  },
  {
    method: "PATCH",
    path: "/tasks/:id/complete",
    handler: (req, res) => {},
  },
];
