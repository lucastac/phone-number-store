import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PhoneNumbersFilter } from '../phone-numbers-filter/PhoneNumbersFilter';
import { PhoneNumbersModal } from '../phone-numbers-modal/PhoneNumbersModal';
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
    const [showModal, setShowModal] = useState(false);
    const allNumbers = useSelector(selectNumbers);
    const filter = useSelector(selectFilter);
    const [editingNumber, setEditingNumber] = useState({});

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
        <Container>
            <Button variant="primary" size="lg" block onClick={()=> { setShowModal(true); }}>
                Add New Number
            </Button>
        </Container>
        <PhoneNumbersFilter />        
        <Container>
            <Row id="TableNumbersHeader" className={styles.header}>
                <Col >ID</Col>
                <Col >Number</Col>
                <Col >Monthy Price</Col>
                <Col >Setup Price</Col>
                <Col >Currency</Col>
                <Col >Action</Col>
            </Row>
            {numbers.map(number => (
            <Row id={number.id} className={styles.row}>
                <Col >{number.id}</Col>
                <Col >{number.value}</Col>
                <Col >{number.monthyPrice}</Col>
                <Col >{number.setupPrice}</Col>
                <Col >{number.currency}</Col>
                <Col >
                    <Button variant="primary" onClick={() => { setEditingNumber(number); setShowModal(true);}}>Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Col>
            </Row>
            ))}
        </Container>
        <PhoneNumbersModal number={editingNumber} show={showModal} onClosed={()=>{ setShowModal(false);  setEditingNumber({}); }} />
    </div>
    );
}
