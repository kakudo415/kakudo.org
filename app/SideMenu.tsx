import Link from "next/link"

import styles from "./SideMenu.module.scss"

export function LinkMenu({ header, links }: { header?: string, links: { text: string, url: string }[] }) {
  return (
    <div className={styles['link-menu']}>
      {header && <p>{header}</p>}
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HomeMenu() {
  return (
    <div>
      <LinkMenu header='Sites' links={[
        { text: 'kakudo415.com', url: 'https://kakudo415.com' },
        { text: 'kakudokentaro.com', url: 'https://kakudokentaro.com' },
      ]} />
    </div>
  )
}

export function SiteMenu() {
  return (
    <div>
      <LinkMenu links={[
        { text: '自己紹介 / About', url: '/about' },
        { text: '履歴書 / Resume', url: '/resume' },
      ]} />
      <LinkMenu header='記事 / Blog' links={[
        { text: 'タグ一覧 / Tags', url: '/tags' },
      ]} />
    </div>
  )
}