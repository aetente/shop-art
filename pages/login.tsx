function Login() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="min-h-[360px] max-w-md bg-slate-200 m-auto p-12 flex flex-col justify-center items-center gap-8">
        <div>LOGIN</div>
        <input placeholder='email' className='text-2xl' />
        <input type='password' placeholder='password' className='text-2xl' />

        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <button className='bg-blue-500 text-gray-50 p-4 w-full'>
            SIGN IN
          </button>
          <div className='text-blue-600 w-full cursor-pointer'>
            Forgot password?
          </div>
          <div className='text-blue-600 w-full cursor-pointer'>
            Create account
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login