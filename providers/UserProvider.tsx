import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import nookies, { destroyCookie } from 'nookies'

type IAppContext = {
  isLoggedIn: boolean,
  setLoggedIn: () => void,
  setLoggedOut: () => void
}

const UserContext = createContext<IAppContext | null>(null)

export const useUserContext = () => useContext(UserContext) as IAppContext

export const UserProvider: React.FC<{
  children: any
}> = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
  })
  
  const setLoggedIn = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setState({
      ...state,
      isLoggedIn: true
    })
  }
  
  const setLoggedOut = () => {
    destroyCookie(undefined, 'jwt');
    localStorage.removeItem('isLoggedIn');
    setState({
      ...state,
      isLoggedIn: false
    })
  }

  
  useEffect(() => {
    const cookies = nookies.get();
    if (cookies['jwt']) {
      localStorage.setItem('isLoggedIn', 'true');
      setState({
        ...state,
        isLoggedIn: true
      })
    } else {
      localStorage.removeItem('isLoggedIn');
      setState({
        ...state,
        isLoggedIn: false
      })
    }
  }, [])

  

  const context: IAppContext = useMemo(() => {
    return {
      ...state,
      setLoggedIn,
      setLoggedOut
    }
  }, [state])

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  )
}
