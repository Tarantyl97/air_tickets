import React from 'react';
import styles from '../Header/styles.module.css';
import aircraft from '../../images/air.svg'

const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.headerLogo} src={aircraft} />
            <h3 className={styles.headerTitle}>Поиск авиабилетов</h3>
        </header>
    )
}

export default Header;

