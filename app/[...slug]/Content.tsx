'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Content as ContentType } from '@/shared/content'
import styles from './Content.module.scss'

export function Content({ content }: { content: ContentType }) {
  return (
    <main className={styles.content}>
      <h1>{content.frontMatter.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
        components={{
          // FIXME: pre > code
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <SyntaxHighlighter
                {...props}
                style={vscDarkPlus}
                language={match ? match[1] : ''}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {content.content}
      </ReactMarkdown>
    </main>
  )
}