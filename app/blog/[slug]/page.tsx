import { css } from '../../../styled-system/css'
import { grid } from '../../../styled-system/patterns'
import Breadcrumbs from '../../../components/ui/Breadcrumbs'
import Document from '../../../components/ui/Document'
import TableOfContents from '../../../components/ui/TableOfContents'
import fs from 'fs'
import path from 'path'

// 実際のブログ記事データは後で実装します
// 現在はダミーデータを使用
const getDummyPost = (slug: string) => {
  return {
    title: `${slug}のタイトル`,
    date: '2024年3月21日',
    content: `
      <h1>${slug}のタイトル</h1>
      <p>これはサンプルの記事内容です。実際の実装では、MDXファイルからコンテンツを取得します。</p>
      <h2>見出し2</h2>
      <p>段落のテキストです。段落のテキストです。段落のテキストです。段落のテキストです。</p>
      <h3>見出し3</h3>
      <p>段落のテキストです。段落のテキストです。段落のテキストです。段落のテキストです。</p>
      <pre><code>// コードブロックのサンプル
console.log('Hello, World!');</code></pre>
      <h2>もう一つの見出し2</h2>
      <p>段落のテキストです。段落のテキストです。段落のテキストです。段落のテキストです。</p>
    `,
    toc: `
      <nav>
        <ul>
          <li><a href="#見出し2">見出し2</a>
            <ul>
              <li><a href="#見出し3">見出し3</a></li>
            </ul>
          </li>
          <li><a href="#もう一つの見出し2">もう一つの見出し2</a></li>
        </ul>
      </nav>
    `
  }
}

// 静的生成のためのパラメータを指定
export function generateStaticParams() {
  // 実際の実装では、ファイルシステムからMDXファイルを読み取り、
  // スラッグのリストを生成します
  return [
    { slug: 'sample-post-1' },
    { slug: 'sample-post-2' },
    { slug: 'sample-post-3' },
    { slug: 'sample-post-4' },
    { slug: 'sample-post' } // サンプルMDXファイル用
  ]
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getDummyPost(slug)

  return (
    <div className={grid({
      gridTemplateColumns: { base: '1fr', desktop: 'repeat(12, 1fr)' },
      gap: { base: '32px', desktop: '32px 64px' }
    })}>
      <div className={css({ gridColumn: { desktop: 'span 12' } })}>
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/blog', label: 'Blog' }
          ]}
          currentPage={post.title}
        />
      </div>

      <div className={css({ gridColumn: { desktop: 'span 9' } })}>
        <Document>
          <h1>{post.title}</h1>
          <time
            dateTime="2024-03-21"
            className={css({
              display: 'block',
              margin: '1rem 0 2rem',
              color: 'foreground.description'
            })}
          >
            {post.date}
          </time>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Document>
      </div>

      <TableOfContents toc={post.toc} />
    </div>
  )
}
