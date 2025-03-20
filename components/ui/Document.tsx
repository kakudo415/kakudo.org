import { css } from '../../styled-system/css'

type DocumentProps = {
  children: React.ReactNode
}

export default function Document({ children }: DocumentProps) {
  return (
    <div
      className={css({
        fontFeatureSettings: '"calt", "palt"',

        // Headings
        '& h1': {
          margin: '64px 0 24px',
          fontSize: { base: '32px', tablet: '36px' },
          lineHeight: { base: 1.5, tablet: 1.4 },
          fontFeatureSettings: '"calt", "palt"',
          wordBreak: 'auto-phrase',
        },

        '& h2': {
          margin: '64px 0 24px',
          fontSize: { base: '28px', tablet: '32px' },
          lineHeight: 1.5,
          fontFeatureSettings: '"calt", "palt"',
          wordBreak: 'auto-phrase',
        },

        '& h3': {
          margin: '40px 0 24px',
          fontSize: { base: '24px', tablet: '28px' },
          lineHeight: 1.5,
          fontFeatureSettings: '"calt", "palt"',
          wordBreak: 'auto-phrase',
        },

        '& h4': {
          margin: '40px 0 16px',
          fontSize: { base: '20px', tablet: '24px' },
          lineHeight: 1.5,
          fontFeatureSettings: '"calt", "palt"',
          wordBreak: 'auto-phrase',
        },

        '& h5': {
          margin: '40px 0 16px',
          fontSize: { base: '16px', tablet: '20px' },
          lineHeight: { base: 1.7, tablet: 1.5 },
          fontFeatureSettings: '"calt", "palt"',
          wordBreak: 'auto-phrase',
        },

        // Text elements
        '& time': {
          display: 'block',
          margin: '1rem 0 2rem',
          color: 'foreground.description',
        },

        '& p': {
          margin: '1rem 0',
        },

        '& strong': {
          fontWeight: 'bold',
        },

        '& a': {
          color: 'foreground.link',
          textDecoration: 'underline',
          _hover: {
            color: 'foreground.hover',
          },
        },

        // Code
        '& p code, & li code, & table code': {
          fontSize: '14px',
          fontFamily: 'monospace',
          margin: '0 2px',
          padding: '2px 4px',
          position: 'relative',
          bottom: '1.5px',
          borderRadius: '2px',
          overflowWrap: 'break-word',
          background: 'background.secondary',
        },

        // Images
        '& img': {
          display: 'block',
          height: 'auto',
          width: '100%',
          borderRadius: '8px',
        },

        // Lists
        '& ol, & ul': {
          margin: '16px 0',
          paddingLeft: '24px',

          '& ol, & ul': {
            margin: '8px 0',
          },

          '& li': {
            margin: '8px 0',
            paddingLeft: '8px',
          },
        },

        // Tables
        '& table': {
          display: 'block',
          maxWidth: 'fit-content',
          overflowX: 'auto',
          fontFeatureSettings: '"tnum"',
          whiteSpace: 'nowrap',
          borderTop: '1px solid',
          borderLeft: '1px solid',
          borderColor: 'border.divider',
          borderCollapse: 'separate',
          borderSpacing: 0,
          borderRadius: '8px',

          '& thead': {
            background: 'background.tertiary',

            '& > tr > th': {
              borderRight: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'border.divider',
            },

            '& > tr:first-child > th:first-child': {
              borderTopLeftRadius: '8px',
            },

            '& > tr:first-child > th:last-child': {
              borderTopRightRadius: '8px',
            },
          },

          '& tbody': {
            '& > tr > td': {
              borderRight: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'border.divider',
            },

            '& > tr:last-child > td:first-child': {
              borderBottomLeftRadius: '8px',
            },

            '& > tr:last-child > td:last-child': {
              borderBottomRightRadius: '8px',
            },
          },

          '& td, & th': {
            padding: '0.5rem 1rem',
          },
        },

        // Blockquotes
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'border.divider',
          paddingLeft: '16px',
        },

        // Code blocks
        '& pre': {
          margin: '16px 0',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '14px',
          lineHeight: 1.7,
          display: 'flex',

          '& code': {
            display: 'block',
            padding: '16px',
          },
        },
      })}
    >
      {children}
    </div>
  )
}
