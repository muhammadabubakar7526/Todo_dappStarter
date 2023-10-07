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
import { BiEditAlt } from 'react-icons/Bi'

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

 function StateArray() {
  const [fruits, setFruits] = useState([])
  const [currentTask, setCurrentTask] = useState('')
  const [editedTask, setEditedTask] = useState('')
  const [editedIndex, setEditedIndex] = useState(-1)

  function updateCurrentFruit(text) {
   setCurrentTask(text)
  }

  function addTaskToArray() {
   const newFruits = [...fruits, currentTask]
   setFruits(newFruits)
   setCurrentTask('')
  }
  function DelTaskToArray(index) {
   const newFruits = [...fruits.slice(0, index), ...fruits.slice(index + 1)]
   setFruits(newFruits)
   setCurrentTask('')
  }

  function EditTaskToArray(index, editedValue) {
   const newFruits = [...fruits]
   newFruits[index] = editedValue
   setFruits(newFruits)
   setCurrentTask('')
   setEditedIndex(-1) // Clear edited index when saving
  }

  //   function DelFruitFromArray(index) {
  //    // Create a new array without the fruit at the specified index
  //    const newFruits = [...fruits.slice(0, index), ...fruits.slice(index + 1)]

  //    // Update the fruits state with the new array
  //    setFruits(newFruits)
  //   }

  return (
   <div className="mx-auto w-full max-w-md rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
    <div className="mb-4">
     <input
      type="text"
      value={currentTask}
      onChange={e => updateCurrentFruit(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Task"
     />
    </div>
    <div className="mb-4">
     <button
      onClick={addTaskToArray}
      className="w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
     >
      ADD TASK
     </button>
    </div>

    <ul>
     {/* {fruits.map((fruit, index) => (
      <li key={index} className="mb-2 text-gray-700">
       {index + 1}. {fruit}
       <button onClick={() => DelFruitToArray(index)}>D</button>
      </li>
     ))} */}
     {fruits.map((fruit, index) => (
      <li
       key={index}
       className="mb-2 flex items-center justify-between text-gray-700"
      >
       <span>
        {index + 1}. {fruit}
       </span>
       <div className="flex gap-2">
        <button
         onClick={() => DelTaskToArray(index)}
         className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
         &#10005; {/* Cross symbol */}
        </button>
        <button
         onClick={() => {
          setEditedIndex(index)
          setEditedTask(fruit)
         }}
         className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
         {/* <BsGrid3X3GapFill /> */}
         <BiEditAlt />
        </button>
       </div>
      </li>
     ))}
    </ul>

    {editedIndex !== -1 && (
     <div>
      <input
       type="text"
       value={editedTask}
       onChange={e => setEditedTask(e.target.value)}
       className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
       placeholder="Edit Task "
      />
      <button
       onClick={() => {
        EditTaskToArray(editedIndex, editedTask)
        setEditedIndex(-1) // Clear edited index when saving
       }}
       className="mt-2 w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
       Save
      </button>
     </div>
    )}
   </div>
  )
 }
 return (
  <main className={styles.main + ' min-h-screen space-y-6'}>
   <StateArray />
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
   <div className="flex items-center">
    {' '}
    ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️{' '}
   </div>
   <div />
  </footer>
 )
}
