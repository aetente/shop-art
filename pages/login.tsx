import { useUserContext } from "@/providers/UserProvider";
import { logIn } from "@/requests/login";
import { useRouter } from "next/router"
import { useState } from "react";
import Account from "@/components/account";
import Loader from "@/components/loader";

function Login() {

  const isFake = process.env.NEXT_PUBLIC_ENVIRONMENT !== "prod";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, setLoggedIn } = useUserContext()

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const doLogIn = async () => {
    if (email && password) {
      setLoading(true)
      const registrationSuccess = await logIn(email, password)
      if (registrationSuccess || isFake) {
        setLoggedIn();
        // router.push('/');
      } else {
        alert('error during login');
      }
      setLoading(false)
    }
  }

  return (
    !isLoggedIn ? (
    <div className='relative min-h-screen flex justify-center items-center pt-20'>
      {loading ? (<div className='absolute w-full flex justify-center items-center backdrop-blur-sm h-full'><Loader /></div>) :   <div/>}
      <div className="min-h-[360px] w-full max-w-3xl m-auto p-12 flex flex-col justify-center gap-2">
          <p className="font-openSans text-black font-extrabold">Login</p>
          <p className="font-openSans text-black mt-2">Email address</p>
          <input placeholder='email' className='p-1 border-stone-500 border-[0.5px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded' onChange={(e) => { setEmail(e.target.value) }} />
          <p className="font-openSans text-black">Password</p>
          <input type='password' placeholder='password' className='p-1 border-stone-500 border-[0.5px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded' onChange={(e) => { setPassword(e.target.value) }} />

          <div className="flex flex-col justify-center items-center gap-4 w-full mt-2">
            <div className="flex justify-between items-center w-full">
              <div
                onClick={() => {
                  router.push('/signup')
                }}
                className='cursor-pointer text-sm'
              >
                Create account
              </div>
              <div className='cursor-pointer text-sm'>
                Forgot password?
              </div>
            </div>
            <button
              onClick={() => {
                doLogIn();
              }}
              className={`${!(email && password) ? "bg-gray-300 text-gray-500" : "bg-[#B20000] text-white"} p-1 rounded w-full max-w-[144px]`}
              disabled={!(email && password)}
            >
              LOG IN
            </button>
          </div>
        
        
      </div>
    </div>
  ) : (
    <Account />
  ))
}

export default Login