export function buildRoutePath(path) {
  const routeParameters = /:([a-aA-Z]+)/g;
  const paramsWithParams = path.replaceAll(
    routeParameters,
    "(?<$1>[a-z0-9-_]+)"
  );

  const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
