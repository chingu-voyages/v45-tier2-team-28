import styles from './styles/Footer.module.css'

import { AiOutlineGithub } from 'react-icons/ai'

const Footer = () => {
return (
    <div className={styles.footer}>
    <p className={styles.footerText}>Created by Team 28 - Chingu Voyage 45 </p> 
    <a href="https://github.com/chingu-voyages/v45-tier2-team-28/tree/main/voyage-45"><AiOutlineGithub color="black" size="30px"/></a>
    </div>
)
}

export default Footer;