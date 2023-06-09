import Link from "next/link"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header>
      <div className={styles.inner}>
        <h1><Link href="/">覚道 健太郎</Link></h1>
      </div>
    </header>
  )
}