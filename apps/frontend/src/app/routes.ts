export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  about: "/about",
  terms: "/terms",
  userDetail: (username: string) => `/users/${username}`,
} as const
