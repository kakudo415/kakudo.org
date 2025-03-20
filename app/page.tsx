import { css } from '../styled-system/css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <p className={css({ mb: 4 })}>
        <Link href="/about" className={css({ color: 'foreground.link', _hover: { color: 'foreground.hover' } })}>
          覚道健太郎
        </Link>
        のページ。
      </p>

      <p className={css({ mb: 4 })}>
        大学でコンピュータサイエンスと応用代数を勉強しています。<br />
        研究分野はコンパイラの最適化です。
      </p>
    </div>
  )
}
