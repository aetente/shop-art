import { destroyCookie } from "nookies"

export const logout = () => {
  destroyCookie(undefined, 'jwt');
  localStorage.removeItem('isLoggedIn');

  // Router.push('/')
}