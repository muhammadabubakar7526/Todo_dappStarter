import styles from 'styles/Home.module.scss'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import { useState } from 'react'
import {
 useNetwork,
 useSwitchNetwork,
 useAccount,
 useContractWrite,
} from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
 useConnectModal,
 useAccountModal,
 useChainModal,
} from '@rainbow-me/rainbowkit'
import { useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import abi from 'constant/abi/buy.json'
import Header from 'components/Header'
import useWhitelistData from 'hooks/useWhitelistData'
import { whitelistAddress } from 'constant/abi/contractAddress'
import WHITELISTABI from '../constant/abi/whitelistDapp.json'

export default function Home() {
 return (
  <div className={styles.container}>
   <Header />
   <Main />
   <Footer />
  </div>
 )
}

function Main() {
 const { address, isConnected, connector } = useAccount()

 const { chain, chains } = useNetwork()
 const {
  isLoading: isNetworkLoading,
  pendingChainId,
  switchNetwork,
 } = useSwitchNetwork()
 const { data: maxWhitelist } = useWhitelistData('maxWhitelistedAddresses')
 const { data: totalWhitelisted } = useWhitelistData('numAddressesWhitelisted')
 const { data: whiteListedAddress } = useWhitelistData(
  'whiteListedAddress',
  address
 )

 const { getAddToWhiteList } = useWhitelistData()
 //  console.log({ getAddToWhiteList })
 async function addToWhiteList() {
  try {
   getAddToWhiteList()
   // here to call the write function
  } catch (err) {
   console.error(err)
  }
 }
 const [value, setValue] = useState('')

 const buyToken = async () => {
  alert('clicked')
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  let contract
  contract = new ethers.Contract(
   '0xD890a2c65D8222f121Bb61C3cf873705ec838913',
   abi,
   provider
  )
  const signer = provider.getSigner()
  const Contract = contract.connect(signer)
  // setLoading(true);
  await Contract.buyTokens(value)
  alert('success')
  // setLoading(false);
 }
 return (
  //   <main className={styles.main + ' min-h-screen space-y-6'}>
  //    <>
  //     <div className="flex w-full border border-red-500 ">
  //      <div className="border border-green-900">
  //       <h1 className="font-bold text-white">Buy Tokens</h1>
  //       <div className="border-white-90 flex flex-col items-start gap-6 rounded-lg border p-6">
  //        <input
  //         id="buy1"
  //         onChange={e => {
  //          console.log(e.currentTarget.value)
  //          setValue(e.currentTarget.value)
  //         }}
  //         className="w-[300px] rounded p-2"
  //         placeholder="Enter Amount"
  //        />
  //        <button className="rounded bg-blue-800 px-2 py-1" onClick={buyToken}>
  //         Buy Token
  //        </button>
  //       </div>
  //      </div>

  //      <div>
  //       <h1 className="font-bold text-white">Add Tokens</h1>
  //       <div className="border-white-90 flex flex-col items-center justify-center gap-6 rounded-lg border p-6">
  //        <input
  //         id="buy1"
  //         onChange={e => {
  //          console.log(e.currentTarget.value)
  //          setValue(e.currentTarget.value)
  //         }}
  //         className="w-[300px] rounded p-2"
  //         placeholder="Enter Amount"
  //        />
  //        <button className="rounded bg-blue-800 px-2 py-1" onClick={buyToken}>
  //         Add Token
  //        </button>
  //       </div>
  //      </div>
  //     </div>
  //    </>
  //   </main>
  <main className={styles.main + ' min-h-screen space-y-6'}>
   <div className="flex w-full flex-col space-y-6 md:flex-row md:space-y-0">
    <div className="p-4 md:w-1/2">
     <div className="rounded-lg border border-green-900 p-6">
      <h1 className="mb-4 text-center font-bold text-white">Buy Tokens</h1>
      <input
       id="buy1"
       onChange={e => {
        console.log(e.currentTarget.value)
        setValue(e.currentTarget.value)
       }}
       className="mb-4 w-full rounded p-2 "
       placeholder="Enter Amount"
      />
      <button
       className="w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
       onClick={buyToken}
      >
       Buy Token
      </button>
     </div>
    </div>

    <div className="p-4 md:w-1/2">
     <div className="rounded-lg border border-green-900 p-6">
      <h1 className="mb-4 text-center font-bold text-white">Add Tokens</h1>
      <input
       id="buy2"
       onChange={e => {
        console.log(e.currentTarget.value)
        setValue(e.currentTarget.value)
       }}
       className="mb-4 w-full rounded p-2 "
       placeholder="Enter Amount"
      />
      <button
       className="w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
       //    onClick={addToken}
      >
       Add Token
      </button>
     </div>
    </div>
   </div>
  </main>
 )
}

function SignMsg() {
 const [msg, setMsg] = useState('Qalb E Habib')
 const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
  message: msg,
 })
 const signMsg = () => {
  if (msg) {
   signMessage()
  }
 }

 return (
  <>
   <p>
    <input
     value={msg}
     onChange={e => setMsg(e.target.value)}
     className="rounded-lg p-1"
    />
    <button
     disabled={isLoading}
     onClick={() => signMsg()}
     className="ml-1 rounded-lg bg-blue-500 py-1 px-2 text-white transition-all duration-150 hover:scale-105"
    >
     Sign
    </button>
   </p>
   <p className="pt-3">
    {isSuccess && (
     <>
      <span className="font-bold text-gray-500">
       Signature <br />
      </span>

      <span>{data}</span>
     </>
    )}
    {isError && <span>Error signing message</span>}
   </p>
  </>
 )
}

function Footer() {
 return (
  <footer className={styles.footer}>
   <div />
   {/* <div className="flex items-center"> ❤️ </div> */}
   <div />
  </footer>
 )
}
