import Link from "next/link"
import styles from "./Header.module.css"

export default function Header({ className }: { className: string }) {
  return (
    <header className={className}>
      <div className={styles.inner}>
        <h1><Link href="/">覚道 健太郎</Link></h1>
        <Link href="/about"></Link>
      </div>
    </header>
  )
}