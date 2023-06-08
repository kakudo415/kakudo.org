import Header from './Header'
import { Topics } from './Topics'
import styles from './page.module.scss'
import { HomeMenu, SiteMenu } from './SideMenu'

// Layout component
export default function Home() {
  return (
    <div className={styles.container}>
      <Header className={styles['header']} />
      <HomeMenu className={styles['home-menu']} />
      <Topics className={styles['topics']} />
      <SiteMenu className={styles['site-menu']} />
    </div>
  )
}
