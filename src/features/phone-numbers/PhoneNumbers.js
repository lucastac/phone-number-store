import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { PhoneNumbersFilter } from '../phone-numbers-filter/PhoneNumbersFilter';
import styles from './PhoneNumbers.module.css';

import {
    removeNumberAsync,
    loadData,
    selectNumbers 
} from './phoneNumbersSlice';

import {
    selectFilter 
} from '../phone-numbers-filter/phoneNumbersFilterSlice';

export function PhoneNumbers() {
    const dispatch = useDispatch();
    const allNumbers = useSelector(selectNumbers);
    const filter = useSelector(selectFilter);

    const filterNumbers = (allNumbers, filter) => {
        return allNumbers.filter(n => {
            if (filter.id && !n.id.toString().includes(filter.id)) return false;
            if (filter.value && !n.value.includes(filter.value)) return false;
            if (filter.monthyPrice && !n.monthyPrice.includes(filter.monthyPrice)) return false;
            if (filter.setupPrice && !n.setupPrice.includes(filter.setupPrice)) return false;
            if (filter.currency && !n.currency.includes(filter.currency)) return false;
            return true;
        });
    };

    React.useEffect(() =>{
        dispatch(loadData(10));
    }, [dispatch]);
    
    const numbers = filterNumbers(allNumbers, filter);

    return (
    <div>
        <PhoneNumbersFilter />
        <Container>
            <Row id="TableNumbersHeader" className={styles.header}>
                <Col >ID</Col>
                <Col >Number</Col>
                <Col >Monthy Price</Col>
                <Col >SetupPrice</Col>
                <Col >Currency</Col>
            </Row>
            {numbers.map(number => (
            <Row id={number.id} className={styles.row}>
                <Col >{number.id}</Col>
                <Col >{number.value}</Col>
                <Col >{number.monthyPrice}</Col>
                <Col >{number.setupPrice}</Col>
                <Col >{number.currency}</Col>
            </Row>
            ))}
        </Container>
    </div>
    );
}
