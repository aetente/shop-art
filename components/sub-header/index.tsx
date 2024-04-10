import { useState } from "react";
import Menu from '@/components/menu'
import { useRouter } from "next/router";
import { useUserContext } from "@/providers/UserProvider";
import Image from "next/image";

const SubHeader = () => {
	
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const { isLoggedIn } = useUserContext()

	return (
		<div className='flex items-center justify-between w-full'>

			<div>
				<div
					className='relative flex items-center justify-between gap-2 cursor-pointer'
					onClick={() => {
						setOpenMenu(!openMenu)
					}}
				>
					<div className="relative w-[32px] h-[32px]">
						<Image
							layout='fill'
							src="/icons/burger.png"
							alt='MENU'
						/>
					</div>
					<p>MENU</p>
				</div>
				{openMenu ? <Menu onClose={() => {
					setOpenMenu(false)
				}} /> : <></>}
			</div>

			<div
				className='flex items-center justify-between gap-2 cursor-pointer'
				onClick={() => {
					router.push('/login')
				}}
			>
				{isLoggedIn ? (<>
					<div className="relative w-[32px] h-[32px]">
						<Image
							layout='fill'
							src="/icons/avatar_placeholder.png"
							alt='ACCOUNT'
						/>
					</div>
					<p>ACCOUNT</p>
				</>) : (
					<p>LOG IN</p>
				)}
			</div>

		</div>
	)
}

export default SubHeader;