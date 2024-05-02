import { useUserContext } from "@/providers/UserProvider";
import { logout } from "@/utils/logout";
import { useRouter } from "next/router";
import nookies from 'nookies';
import { useState } from "react";


function Account(props: any) {

	const [selectedMenuItem, setSelectedMenuItem] = useState(0);

	const { isLoggedIn, setLoggedIn, setLoggedOut } = useUserContext()

	const router = useRouter()

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

	const fillInBoughtItems = () => {

		const boughtItemsString = localStorage.getItem("boughtItems");
		console.log(boughtItemsString)
		const boughtItems = boughtItemsString && boughtItemsString !== "undefined" ? JSON.parse(boughtItemsString).filter((fd: any) => fd ? true : false) : [];
		return boughtItems.map((fd: any, i: number) => {
			console.log("fd", fd)
			return (
				<div
					className="flex justify-between items-center gap-3"
					key={`download-${i}`}
				>
					<p className="text-[#333333] text-sm font-openSans">
						#{fd.id}
					</p>
					<button
						onClick={() => {
							doDownload(fd.file_download.file[0].url);
						}}
						className={`text-[#b20000] text-sm font-openSans `}
					>
						File Link
					</button>
				</div>
			)
		})
	}

	return (
		<div className="w-full flex pt-24 gap-8">
			<div className="min-w-[312px] h-fit shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-[#e6e6e6] border-[1px] rounded-[8px] ">
				<div className="px-5 py-6">
					<p className="font-openSans font-bold text-xl text-[#1a1a1a]">Navigation</p>
				</div>
				<div className={`px-5 py-4 hover:bg-[#f2eded] hover:text-[#1a1a1a] ${selectedMenuItem === 0 ? 'bg-[#f2eded] text-[#1a1a1a]' : 'text-[#666666]'} cursor-pointer`}>
					<p className="font-openSans text-base">Dashboard</p>
				</div>
				<div className={`px-5 py-4 hover:bg-[#f2eded] hover:text-[#1a1a1a] ${selectedMenuItem === 1 ? 'bg-[#f2eded] text-[#1a1a1a]' : 'text-[#666666]'} cursor-pointer`}>
					<p className="font-openSans text-base">Bough Items</p>
				</div>
				<div className={`px-5 py-4 hover:bg-[#f2eded] hover:text-[#1a1a1a] ${selectedMenuItem === 2 ? 'bg-[#f2eded] text-[#1a1a1a]' : 'text-[#666666]'} cursor-pointer`}>
					<p className="font-openSans text-base">Shopping Cart</p>
				</div>
				<div className={`px-5 py-4 hover:bg-[#f2eded] hover:text-[#1a1a1a] ${selectedMenuItem === 3 ? 'bg-[#f2eded] text-[#1a1a1a]' : 'text-[#666666]'} cursor-pointer`}>
					<p className="font-openSans text-base">Settings</p>
				</div>
				<div
					className="px-5 py-4 hover:bg-[#f2eded] hover:text-[#1a1a1a] text-[#666666] cursor-pointer"
					onClick={() => {
						doLogOut();
					}}
				>
					<p className="font-openSans text-base">Log-out</p>
				</div>
			</div>

			<div className="w-full">
				<div className="max-w-[424px] border-[#e6e6e6] p-8 border-[1px] rounded-[8px] mb-8">
					<p className="font-openSans font-bold text-[#999999] pb-4 text-sm">USER INFO</p>
					<p className="font-openSans text-[#1a1a1a] pb-2 text-lg">John Dough</p>
					<p className="font-openSans text-[#1a1a1a] pb-5 text-base">test@test.test</p>
					<p className="font-openSans text-[#b20000] text-base cursor-pointer">EDIT DETAILS</p>
				</div>

				<div className="w-full min-w-[424px] border-[#e6e6e6] p-8 border-[1px] rounded-[8px] flex flex-col">
					{fillInBoughtItems()}
				</div>
			</div>
		</div>
	)
}

export default Account