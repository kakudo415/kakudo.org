import type { MDXComponents } from 'mdx/types'
import { css } from './styled-system/css'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 見出し
    h1: ({ children }) => (
      <h1 className={css({
        margin: '64px 0 24px',
        fontSize: { base: '32px', tablet: '36px' },
        lineHeight: { base: 1.5, tablet: 1.4 },
        fontFeatureSettings: '"calt", "palt"',
        wordBreak: 'auto-phrase',
      })}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={css({
        margin: '64px 0 24px',
        fontSize: { base: '28px', tablet: '32px' },
        lineHeight: 1.5,
        fontFeatureSettings: '"calt", "palt"',
        wordBreak: 'auto-phrase',
      })}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={css({
        margin: '40px 0 24px',
        fontSize: { base: '24px', tablet: '28px' },
        lineHeight: 1.5,
        fontFeatureSettings: '"calt", "palt"',
        wordBreak: 'auto-phrase',
      })}>
        {children}
      </h3>
    ),

    // テキスト要素
    p: ({ children }) => (
      <p className={css({ margin: '1rem 0' })}>
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || '#'}
        className={css({
          color: 'foreground.link',
          textDecoration: 'underline',
          _hover: { color: 'foreground.hover' }
        })}
      >
        {children}
      </Link>
    ),

    // リスト
    ul: ({ children }) => (
      <ul className={css({ margin: '16px 0', paddingLeft: '24px' })}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className={css({ margin: '16px 0', paddingLeft: '24px' })}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className={css({ margin: '8px 0', paddingLeft: '8px' })}>
        {children}
      </li>
    ),

    // コード
    code: ({ children }) => (
      <code className={css({
        fontFamily: 'monospace',
        margin: '0 2px',
        padding: '2px 4px',
        position: 'relative',
        bottom: '1.5px',
        borderRadius: '2px',
        overflowWrap: 'break-word',
        background: 'background.secondary',
      })}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className={css({
        margin: '16px 0',
        borderRadius: '8px',
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: 1.7,
        display: 'flex',
      })}>
        {children}
      </pre>
    ),

    // 引用
    blockquote: ({ children }) => (
      <blockquote className={css({
        borderLeft: '4px solid',
        borderColor: 'border.divider',
        paddingLeft: '16px',
      })}>
        {children}
      </blockquote>
    ),

    // 画像
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ''}
        className={css({
          display: 'block',
          height: 'auto',
          width: '100%',
          borderRadius: '8px',
        })}
      />
    ),

    // その他の要素
    ...components,
  }
}
