import { css } from '../../styled-system/css'

type TableOfContentsProps = {
  toc: string // HTMLとして渡される目次
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  return (
    <aside
      className={css({
        overflowY: 'auto',
        display: { base: 'none', desktop: 'block' },
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '32px',

        '& nav': {
          fontSize: '14px',
          lineHeight: 1.7,
          fontFeatureSettings: '"calt", "palt"',
          wordBreak: 'auto-phrase',

          '& ul': {
            listStyle: 'none',

            '& li': {
              margin: '0.5em 0',

              '& a:hover': {
                textDecoration: 'underline'
              }
            }
          },

          '& > ul': {
            fontWeight: 'bold',

            '& ul': {
              fontWeight: 'normal'
            }
          }
        }
      })}
      dangerouslySetInnerHTML={{ __html: toc }}
    />
  )
}
