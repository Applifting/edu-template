import { ROUTES } from "@/app/routes"
import { HeaderNavLink } from "@/components/Header/HeaderNavLink"

export function HeaderNav() {
  return (
    <nav className="flex items-center gap-1">
      <HeaderNavLink to={ROUTES.home}>Home</HeaderNavLink>
      <HeaderNavLink to={ROUTES.about}>About</HeaderNavLink>
      <HeaderNavLink to={ROUTES.terms}>Terms</HeaderNavLink>
    </nav>
  )
}
