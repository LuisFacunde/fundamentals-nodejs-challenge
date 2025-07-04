import http from "node:http";
import { routes } from "./routes";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  const route = routes.find((route) => {
    return route.method == method && route.path.teste(url);
  });
});

server.listen(3333);
