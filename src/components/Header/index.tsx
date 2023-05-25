import { app } from 'appConfig'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import styles from 'styles/Home.module.scss'
export default function Header() {
  return (
    <header className={styles.header}>
      <div className="text-3xl font-bold">{app.developer}</div>
      <div className="flex items-center text-3xl font-bold"> 😎 {app.name} 😎</div>

      <div className="flex items-center space-x-3">
        <div>
          <ThemeToggleButton />
          <ThemeToggleList />
        </div>
        <ConnectWallet />
      </div>
    </header>
  )
}
