import { destroyCookie } from "nookies"

export const logout = () => {
  destroyCookie(undefined, 'jwt');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem("boughtItems");
  // Router.push('/')
}