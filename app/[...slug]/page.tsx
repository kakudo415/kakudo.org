import { Header } from '@/components/Header'
import { SiteMenu } from '@/components/SideMenu'
import { Content } from './Content'

import { fetchContents } from '@/shared/content'
import styles from './page.module.scss'

export default function Page({ params }: { params: { slug: string[] } }) {
  const content = fetchContents().get(params.slug.join('/'))
  if (!content) {
    return (
      <div className={styles.container}>
        <div className={styles['header']}>
          <Header />
        </div>
        <div className={styles['content']}>
          <h1>404 Not Found</h1>
        </div>
        <div className={styles['site-menu']}>
          <SiteMenu />
        </div>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles['header']}>
        <Header />
      </div>
      <div className={styles['content']}>
        <Content content={content} />
      </div>
      <div className={styles['site-menu']}>
        <SiteMenu />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  let params: { slug: string[] }[] = []
  const contents = fetchContents()
  contents.forEach((_, slug) => {
    params.push({ slug: slug.split('/') })
  })
  return params
}