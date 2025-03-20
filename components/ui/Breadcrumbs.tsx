import Link from 'next/link'
import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'

type BreadcrumbItem = {
  href: string
  label: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  currentPage: string
}

export default function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
  return (
    <nav>
      <ol className={flex({ wrap: 'wrap', listStyle: 'none', p: 0 })}>
        {items.map((item, index) => (
          <li
            key={index}
            className={css({
              m: 0,
              fontSize: '14px',
              lineHeight: 1.7,
              display: 'inline',
              _after: {
                content: '">',
                mx: '0.5rem'
              }
            })}
          >
            <Link
              href={item.href}
              className={css({
                color: 'foreground.link',
                textDecoration: 'underline',
                _hover: { color: 'foreground.hover' }
              })}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li
          className={css({
            m: 0,
            fontSize: '14px',
            lineHeight: 1.7,
            display: 'inline'
          })}
        >
          {currentPage}
        </li>
      </ol>
    </nav>
  )
}
