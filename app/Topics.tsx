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

export function Topics({ className }: { className: string }) {
  return (
    <main className={className}>
      <TopicList topics={[
        { title: '透過ウィンドウの裏にあるChromeが動画を描画しないときの対処法', description: 'Windows Terminalを透明にして裏でYouTubeでも見ようとしたら描画されなかったのでフラグを切り替えて対処した話', url: '/2023/05/disable-chrome-background-invisibility-feature' },
        { title: '研究室PCにCloudflare TunnelsでSSHする', description: '学内ネットワークの研究室PCに、Cloudflare Tunnelsを利用してSSHした備忘録', url: '/2023/05/lab-network-tunneling' },
        { title: 'ATOK 設定備忘録', description: 'ATOKの設定備忘録です', url: '/2023/05/atok-settings' },
      ]}/>
    </main>
  )
}