import { getRouteApi } from "@tanstack/react-router"

const ROOT_LAYOUT = "/_ProtectedPages"

export const routeApis = {
  root: () => getRouteApi(ROOT_LAYOUT),
  home: () => getRouteApi(`${ROOT_LAYOUT}/`),
  userDetail: () => getRouteApi(`${ROOT_LAYOUT}/users/$username`),
  login: () => getRouteApi("/login"),
  signup: () => getRouteApi("/signup"),
} as const
