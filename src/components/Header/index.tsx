import { useChainModal } from '@rainbow-me/rainbowkit'
import { app } from 'appConfig'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import styles from 'styles/Home.module.scss'
export default function Header() {
  const { openChainModal } = useChainModal()

  return (
    <header className={styles.header}>
      {/* <div className="text-3xl font-bold">{app.developer}</div> */}
      <div className="flex items-center text-3xl font-bold">{app.name} 😎</div>
      <div className="flex items-center space-x-3">
        <div>
          <ThemeToggleButton />
          <ThemeToggleList />
        </div>
        <ConnectWallet />
        {openChainModal && (
          <button
            onClick={openChainModal}
            type="button"
            className="m-1 rounded-lg bg-orange-500 py-1 px-3 text-white transition-all duration-150 hover:scale-105"
          >
            Chains
          </button>
        )}
      </div>
    </header>
  )
}
