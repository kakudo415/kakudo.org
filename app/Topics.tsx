import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from "next/link"

import styles from "./Topics.module.scss"

import { fetchContents } from './_shared/content'

export function TopicList({ topics }: { topics: { title: string, description: string, url: string }[] }) {
  return (
    <div className={styles.topics}>
      {topics.map(topic => (
        <div key={topic.title}>
          <Link href={topic.url}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export function Topics() {
  const topics: { title: string, description: string, url: string, date: Date }[] = []
  fetchContents().forEach((content, slug) => {
    if (!content.frontMatter.topic) {
      return
    }
    topics.push({
      title: content.frontMatter.title,
      description: content.frontMatter.description,
      url: slug,
      date: content.frontMatter.date,
    })
  })
  topics.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  return (
    <main>
      <TopicList topics={topics}/>
    </main>
  )
}