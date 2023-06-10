import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Header from '../_shared/Header'
import { HomeMenu, SiteMenu } from '../_shared/SideMenu'
import { Content } from './Content'
import styles from './page.module.scss'
import { fetchContents } from '../_shared/content'

const contentDirectory = path.join(process.cwd(), 'content')

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