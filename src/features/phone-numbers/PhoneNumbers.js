import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PhoneNumbersFilter } from '../phone-numbers-filter/PhoneNumbersFilter';
import { PhoneNumbersModal } from '../phone-numbers-modal/PhoneNumbersModal';
import styles from './PhoneNumbers.module.css';

import {
    retrieveNumbers,
    removeNumberServer,
    selectNumbers,
    selectPagination,
    selectLoading
} from './phoneNumbersSlice';

import {
    selectFilter
} from '../phone-numbers-filter/phoneNumbersFilterSlice';

export function PhoneNumbers() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const isLoading = useSelector(selectLoading);
    const numbers = useSelector(selectNumbers);
    const filter = useSelector(selectFilter);
    const pagination = useSelector(selectPagination);
    const [editingNumber, setEditingNumber] = useState({});

    React.useEffect(() =>{
        dispatch(retrieveNumbers(filter, pagination));
    }, [filter, pagination]);


    if (isLoading)
    {
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
                    <Row>Loading...</Row>
                </Container>
                <PhoneNumbersModal number={editingNumber} show={showModal} onClosed={()=>{ setShowModal(false);  setEditingNumber({}); }} />
            </div>
            );
    }

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
