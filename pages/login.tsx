import { useUserContext } from "@/providers/UserProvider";
import { logIn } from "@/requests/login";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, setLoggedIn, setLoggedOut } = useUserContext()

  const router = useRouter()

  const doLogIn = async () => {
    if (email && password) {
      const registrationSuccess = await logIn(email, password)
      if (registrationSuccess) {
        setLoggedIn();
        router.push('/');
      } else {
        alert('error during login');
      }
    }
  }

  const doLogOut = () => {
    setLoggedOut();
    router.push('/');
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="min-h-[360px] max-w-md bg-slate-200 m-auto p-12 flex flex-col justify-center items-center gap-8">
        {!isLoggedIn ? (<>
          <div>LOGIN</div>
          <input placeholder='email' className='text-2xl' onChange={(e) => { setEmail(e.target.value) }} />
          <input type='password' placeholder='password' className='text-2xl' onChange={(e) => { setPassword(e.target.value) }} />

          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <button
              onClick={() => {
                doLogIn();
              }}
              className={`${!(email && password) ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-gray-50"} p-4 w-full`}
              disabled={!(email && password)}
            >
              SIGN IN
            </button>
            <div className='text-blue-600 w-full cursor-pointer'>
              Forgot password?
            </div>
            <div
              onClick={() => {
                router.push('/signup')
              }}
              className='text-blue-600 w-full cursor-pointer'
            >
              Create account
            </div>
          </div>
        </>) : (
          <>

            <button
              onClick={() => {
                doLogOut();
              }}
              className={`bg-blue-500 text-gray-50 p-4 w-full`}
            >
              LOG OUT
            </button>
          </>

        )}
      </div>
    </div>
  )
}

export default Login