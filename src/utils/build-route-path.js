export function buildRoutePath(path) {
  const routeParameters = /:([a-zA-Z_]+)/g;
  const pathWithParams = path.replaceAll(
    routeParameters,
    (_, key) => `(?<${key}>[^/\\?]+)`
  );

  const pathRegex = new RegExp(`^${pathWithParams}(\\?(?<query>.*))?$`);

  return pathRegex;
}
