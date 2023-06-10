import path from 'path'
import fs from 'fs'

import matter from 'gray-matter'

const contentsDirectory = path.join(process.cwd(), 'content')

export type Content = {
  frontMatter: {
    title: string,
    date: Date,
    description: string,
    tags: string[],
    draft: boolean,
    topic: boolean,
  },
  content: string,
}

export function fetchContents(): Map<string, Content> {
  const files = listFiles(contentsDirectory)
  let contents = new Map<string, Content>()
  files.filter(file => {
    const match = file.match(/\.md$/)
    return match != null
  }).map(file => {
    const rawContent = fs.readFileSync(path.join(contentsDirectory, file), 'utf8')
    const { data, content } = matter(rawContent)
    const slug = path.normalize(file.replace(/.md$/, '')).split(path.sep).join('/').replace(/^\//, '') // TODO: Refactor slug normalization
    contents.set(slug, {
      frontMatter: {
        title: data.title,
        date: new Date(data.date),
        description: data.description,
        tags: data.tags,
        draft: data.draft,
        topic: data.topic ?? true,
      },
      content: content,
    })
  })
  return contents
}

export function listFiles(rootDir: string) {
  function walk(dir: string): string[] {
    let files = []
    for (const child of fs.readdirSync(path.join(rootDir, dir), { withFileTypes: true })) {
      if (child.isDirectory()) {
        files.push(...walk(path.join(dir, child.name)))
      }
      if (child.isFile()) {
        files.push(`${dir}/${child.name}`)
      }
    }
    return files
  }
  return walk('')
}