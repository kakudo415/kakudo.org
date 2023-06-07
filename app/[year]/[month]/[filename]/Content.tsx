import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './Content.module.css'

export function Content({ className, property, content }: { className: string, property: { [key: string]: any }, content: string }) {
  return (
    <main className={`${className} ${styles.content}`}>
      <h1>{ property.title }</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        { content }
      </ReactMarkdown>
    </main>
  )
}