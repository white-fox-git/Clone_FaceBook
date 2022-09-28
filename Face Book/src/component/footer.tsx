import style from '../css/component.module.css';

const Footer = () => {
    return(
        <footer className={style.footer}>
            <p>Develope by White-Fox</p>
            <a target="blank" href="https://github.com/white-fox-git" className={style.a}>Git Hub</a>
        </footer>
    )
}

export default Footer;