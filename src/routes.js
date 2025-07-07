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
      
      console.log("Nova task criada");
      return res.writeHead(201).end();
    },
  },

  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const taskList = database.select(
        "tasks",
        search ? {
              title: search,
              description: search,
            }: null);

      // Utilizando o método map para formatar as datas de cada tarefa
      const formattedTasks = taskList.map((task) => { // Para cada tarefa, retorna um novo objeto com as datas formatadas
        return {
          ...task, // Copia todos os campos originais (id, title, description)
          created_at: formatDateDisplay(new Date(task.created_at)),
          update_at: formatDateDisplay(new Date(task.update_at)),
          completed_at: task.completed_at // Trata o caso de 'completed_at', que pode ser nulo
            ? formatDateDisplay(new Date(task.completed_at))
            : null,
        };
      });
      console.log("GET chamado para listar tarefas");
      return res.end(JSON.stringify(formattedTasks)); // Envia a nova lista com as datas já formatadas
    },
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      database.update("tasks", id, {
        title,
        description,
        update_at: new Date(), // Atualiza a data de modificação
      });

      console.log("PUT chamado para id:", req.params.id);

      return res.writeHead(204).end();
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      console.log("DELETE chamado para id:", req.params.id);

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      const isCompleted = !!task.completed_at;
      const newCompletedState = isCompleted ? null : new Date();

      database.update("tasks", id, {
        completed_at: newCompletedState,
        update_at: new Date(),
      });

      console.log("PATCH chamado para id:", req.params.id);

      return res.writeHead(204).end();
    },
  },
];
