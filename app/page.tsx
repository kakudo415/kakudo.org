import Header from './Header'
import { Topics } from './Topics'
import styles from './page.module.scss'
import { HomeMenu, SiteMenu } from './SideMenu'

// Layout component
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles['header']}>
        <Header />
      </div>
      <div className={styles['home-menu']}>
        <HomeMenu />
      </div>
      <div className={styles['topics']}>
        <Topics />
      </div>
      <div className={styles['site-menu']}>
        <SiteMenu />
      </div>
    </div>
  )
}
