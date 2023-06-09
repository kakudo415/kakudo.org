import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Header from '../_shared/Header'
import { HomeMenu, SiteMenu } from '../_shared/SideMenu'
import { Content } from './Content'
import styles from './page.module.scss'

const contentDirectory = path.join(process.cwd(), 'content')

export default function Page({ params }: { params: { filePath: string[] } }) {
  const filePath = path.join(contentDirectory, params.filePath.join('/') + '.md')
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return (
    <div className={styles.container}>
      <div className={styles['header']}>
        <Header />
      </div>
      <div className={styles['content']}>
        <Content property={data} content={content} />
      </div>
      <div className={styles['site-menu']}>
        <SiteMenu />
      </div>
    </div>
  )
}