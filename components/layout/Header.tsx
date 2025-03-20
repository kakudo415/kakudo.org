import Link from 'next/link'
import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'

export default function Header() {
  return (
    <header className={css({ borderBottom: '1px solid', borderColor: 'border.divider' })}>
      <div
        className={flex({
          alignItems: 'center',
          justifyContent: 'space-between',
          height: { base: '4rem', tablet: '6rem' },
          margin: '0 auto',
          maxWidth: 'maxWidth',
          px: { base: '1rem', tablet: '2rem' }
        })}
      >
        <h1
          className={css({
            fontSize: { base: '1rem', tablet: '1.25rem' },
            fontWeight: { base: 400, tablet: 500 },
            lineHeight: '2rem'
          })}
        >
          <Link href="/">kakudo.org</Link>
        </h1>
        <nav
          className={flex({
            overflowX: 'auto'
          })}
        >
          <Link
            href="/about"
            className={css({
              display: 'block',
              marginLeft: '0.5rem',
              padding: { base: '0 0.5rem', tablet: '0 1rem' },
              lineHeight: '2rem',
              fontWeight: { base: 'normal', tablet: 500 },
              _hover: { textDecoration: 'underline' }
            })}
          >
            About me
          </Link>
          <Link
            href="/blog"
            className={css({
              display: 'block',
              marginLeft: '0.5rem',
              padding: { base: '0 0.5rem', tablet: '0 1rem' },
              lineHeight: '2rem',
              fontWeight: { base: 'normal', tablet: 500 },
              _hover: { textDecoration: 'underline' }
            })}
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}
