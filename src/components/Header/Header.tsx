import React from 'react';
import styles from '../Header/styles.module.scss';
import aircraft from '../../images/air.svg'

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={aircraft} />
            <h3 className={styles.headerTitle}>Поиск авиабилетов</h3>
        </header>
    )
}

export default Header;

