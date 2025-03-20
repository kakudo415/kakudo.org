import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Document from '../../components/ui/Document'
import { css } from '../../styled-system/css'

export default function BlogPage() {
  // 実際のブログデータは後で実装します
  // 現在はダミーデータを使用
  const years = [
    {
      year: '2024',
      months: [
        {
          month: '3',
          posts: [
            {
              title: 'サンプルブログ記事1',
              date: '2024年3月15日',
              slug: 'sample-post-1'
            },
            {
              title: 'サンプルブログ記事2',
              date: '2024年3月10日',
              slug: 'sample-post-2'
            }
          ]
        },
        {
          month: '2',
          posts: [
            {
              title: 'サンプルブログ記事3',
              date: '2024年2月28日',
              slug: 'sample-post-3'
            }
          ]
        }
      ]
    },
    {
      year: '2023',
      months: [
        {
          month: '12',
          posts: [
            {
              title: 'サンプルブログ記事4',
              date: '2023年12月25日',
              slug: 'sample-post-4'
            }
          ]
        }
      ]
    }
  ]

  return (
    <div>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' }
        ]}
        currentPage="Blog"
      />
      <Document>
        <h1>Blog</h1>

        {years.map((yearGroup) => (
          <div key={yearGroup.year}>
            <h2>{yearGroup.year}年</h2>

            {yearGroup.months.map((monthGroup) => (
              <div key={`${yearGroup.year}-${monthGroup.month}`}>
                <h3>{monthGroup.month}月</h3>
                <ul className={css({ listStyleType: 'none', pl: 0 })}>
                  {monthGroup.posts.map((post) => (
                    <li key={post.slug} className={css({ my: 3 })}>
                      <a
                        href={`/blog/${post.slug}`}
                        className={css({
                          color: 'foreground.link',
                          textDecoration: 'underline',
                          _hover: { color: 'foreground.hover' }
                        })}
                      >
                        {post.title}
                      </a>
                      <br />
                      <span className={css({ color: 'foreground.description' })}>
                        {post.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </Document>
    </div>
  )
}
