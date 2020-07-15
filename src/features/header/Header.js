import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './Header.module.css';

export function Header() {

    return (
    <div>
        <Container className={styles.header}>
                Best phone number store!
        </Container>
    </div>
    );
}
