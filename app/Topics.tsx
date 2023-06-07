import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from "next/link"

import styles from "./Topics.module.css"

export function TopicList({ topics }: { topics: { title: string, description: string, url: string }[] }) {
  return (
    <div className={styles.topics}>
      {topics.map(topic => (
        <div>
          <Link href={topic.url}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

const contentDirectory = path.join(process.cwd(), 'content')

const getFiles = (rootDir: string) => {
  const _getFiles = (dir: string) => {
    let files: string[] = []
    for (const child of fs.readdirSync(path.join(rootDir, dir), { withFileTypes: true })) {
      if (child.isDirectory()) {
        files.push(..._getFiles(path.join(dir, child.name)))
      }
      if (child.isFile()) {
        files.push(`${dir}/${child.name}`)
      }
    }
    return files
  }
  return _getFiles('/')
}

export function Topics({ className }: { className: string }) {
  const files = getFiles(contentDirectory)
  const topics = files.filter(file => {
    const match = file.match(/\.md$/)
    return match != null
  }).map(file => {
    const filename = file.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(contentDirectory, file), 'utf8')
    const { data } = matter(content)
    const date = new Date(data.date)
    return {
      title: data.title,
      description: data.description,
      url: filename,
      date: date,
    }
  })
  topics.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  return (
    <main className={className}>
      <TopicList topics={topics}/>
    </main>
  )
}