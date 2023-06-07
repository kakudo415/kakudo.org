import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Header from '../../../Header'
import { HomeMenu, SiteMenu } from '../../../SideMenu'
import { Content } from './Content'
import styles from './page.module.css'

const contentDirectory = path.join(process.cwd(), 'content')

export default function Page({ params }: { params: { year: number, month: number, filename: string } }) {
  const filePath = path.join(contentDirectory, `${params.year}/${params.month}/${params.filename}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return (
    <div className={styles.container}>
      <Header className={styles['header']} />
      <Content className={styles['content']} property={data} content={content} />
      <SiteMenu className={styles['site-menu']} />
    </div>
  )
}