import { useState } from "react"
import { signUp } from '@/requests/signup'
import { useRouter } from "next/router";

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter()

  const doSignUp = async () => {
    if (email && password) {
      const registrationSuccess = await signUp(email, password)
      if (registrationSuccess) {
        router.push('/login');
      } else {
        alert('error during registration');
      }
    }
  }
  
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="min-h-[360px] max-w-md bg-slate-200 m-auto p-12 flex flex-col justify-center items-center gap-8">
        <div>SIGN UP</div>
        <input placeholder='email' className='text-2xl' onChange={(e) => {setEmail(e.target.value)}}/>
        <input type='password' placeholder='password' className='text-2xl' onChange={(e) => {setPassword(e.target.value)}}/>

        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <button
            onClick={() => {
              doSignUp();
            }}
            className={`${!(email && password) ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-gray-50"} p-4 w-full`}
            disabled={!(email && password)}
          >
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp