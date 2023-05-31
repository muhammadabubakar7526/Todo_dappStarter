import styles from 'styles/Home.module.scss'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import { useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useSignMessage } from 'wagmi'
import Header from 'components/Header'
import useWhitelistData from 'hooks/useWhitelistData'

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
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: maxWhitelist } = useWhitelistData('maxWhitelistedAddresses')
  const { data: totalWhitelisted } = useWhitelistData('numAddressesWhitelisted')
  const { data: whiteListedAddress } = useWhitelistData('whiteListedAddress', address)
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  return (
    <main className={styles.main + ' min-h-screen space-y-6'}>
      <>
        <div className="hero  bg-base-200">
          <div className="hero-content flex-col ">
            <div className="max-w-md text-center ">
              <h1 className="text-5xl font-bold">Join WhiteList</h1>
              <p className="py-6">
                Let get into the whiteList to be a part of Crypto Dev and have the early access of your Crypto Dev NFT,
                the worth $ Millions
              </p>
            </div>
            <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl font-bold">Wallet Address</span>
                  </label>
                  <input type="text" placeholder="email" className="input-bordered input" />
                </div>
                <div className="form-control"></div>
                <div className="form-control ">
                  <button className="btn-primary btn">Join Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
        <input value={msg} onChange={e => setMsg(e.target.value)} className="rounded-lg p-1" />
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
      <div className="flex items-center">Made With ❤️ by QalbeHabib</div>
      <div />
    </footer>
  )
}
