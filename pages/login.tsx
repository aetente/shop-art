import { useUserContext } from "@/providers/UserProvider";
import { logIn } from "@/requests/login";
import { logout } from "@/utils/logout";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import nookies from 'nookies';

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
    logout();
    setLoggedOut();
    router.push('/');
  }

  const doDownload = async (fileUrl: string) => {

    const cookies = nookies.get();
    if (cookies['jwt']) {
      try {
        var options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': '',
            'Host': 'api.producthunt.com',
            'Authorization': `Token ${cookies['jwt']}`
          }
        }
        // await fetch('http://localhost:1337/uploads/wordpress_6_2_2_dfdebd56fe.zip', options)
        await fetch('http://localhost:1337' + fileUrl, options)
          // await fetch('http://localhost:1337/uploads/blot2_strech_288a56fce2.png', options)
          // await fetch('http://localhost:1337/api/upload/files/1', options)
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(url => {
            window.open(url, '_blank');
            URL.revokeObjectURL(url);
          });
      } catch (e) {
        console.error('ERROR downloading the file', e);
      }
    }
  }

  const fillInFileDownloads = () => {

    const filesDownloadsString = localStorage.getItem("filesDownloads");
    const fileDownloads = filesDownloadsString ? JSON.parse(filesDownloadsString).filter((fd: any) => fd ? true : false) : [];
    return fileDownloads.map((fd: any, i: number) => {
      return (

        <button
          key={`download-${i}`}
          onClick={() => {
            doDownload(fd.file[0].url);
          }}
          className={`bg-blue-500 text-gray-50 p-4 w-full`}
        >
          DOWNLOAD {fd.id}
        </button>
      )
    })
  }

  return (
    <div className='min-h-screen flex justify-center items-center pt-20'>
      <div className="min-h-[360px] w-full max-w-3xl m-auto p-12 flex flex-col justify-center gap-2">
        {!isLoggedIn ? (<>
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
            {fillInFileDownloads()}
          </>

        )}
      </div>
    </div>
  )
}

export default Login