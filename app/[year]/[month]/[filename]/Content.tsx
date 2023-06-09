'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'

import styles from './Content.module.scss'

export function Content({ property, content }: { property: { [key: string]: any }, content: string }) {
  return (
    <main className={styles.content}>
      <h1>{ property.title }</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
        children={content}
        components={{
          // FIXME: pre > code
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <SyntaxHighlighter
                {...props}
                style={vscDarkPlus}
                children={String(children).replace(/\n$/, '')}
                language={match ? match[1] : ''}
              />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
        }}
      />
    </main>
  )
}