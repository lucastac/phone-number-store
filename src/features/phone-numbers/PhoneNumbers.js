import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { PhoneNumbersFilter } from './phone-numbers-filter/PhoneNumbersFilter';
import { PhoneNumbersModal } from './phone-numbers-modal/PhoneNumbersModal';
import { PhoneNumbersPagination } from './phone-numbers-pagination/PhoneNumbersPagination';
import styles from './PhoneNumbers.module.css';

import {
    retrieveNumbers,
    removeNumberServer,
    selectNumbers,
    selectFilter,
    selectPaginationPageSelect,
    selectLoading
} from './phoneNumbersSlice';

export function PhoneNumbers() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const isLoading = useSelector(selectLoading);
    const numbers = useSelector(selectNumbers);
    const filter = useSelector(selectFilter);
    const pagination = useSelector(selectPaginationPageSelect);
    const [editingNumber, setEditingNumber] = useState({});

    React.useEffect(() =>{
        dispatch(retrieveNumbers(filter, pagination));
    }, [filter, pagination]);

    const removeNumber = (number) => {
        dispatch(removeNumberServer(number))
    }


    var Rows;
    if (isLoading)
    {
        Rows =(
            <Row className={styles.spinner}>
                <span>Loading...</span>
                <Spinner animation="border" role="status">
                </Spinner>
            </Row>   
            );
    } else if(numbers.length > 0) {
        Rows = (
            <>
            {numbers.map(number => (
                <Row id={number.id} className={styles.row}>
                    <Col >{number.id}</Col>
                    <Col >{number.value}</Col>
                    <Col >{number.monthyPrice}</Col>
                    <Col >{number.setupPrice}</Col>
                    <Col >{number.currency}</Col>
                    <Col >
                        <Button variant="primary" onClick={() => { setEditingNumber(number); setShowModal(true);}}>Edit</Button>
                        <Button variant="danger" onClick={() => { removeNumber(number);}}>Delete</Button>
                    </Col>
                </Row>
            ))}
            </>
        );
    } else {
        Rows =(
            <Row className={styles.spinner}>
                <span>No numbers match filtering</span>
            </Row>   
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
        <PhoneNumbersPagination /> 
        <Container>
            <Row id="TableNumbersHeader" className={styles.header}>
                <Col >ID</Col>
                <Col >Number</Col>
                <Col >Monthy Price</Col>
                <Col >Setup Price</Col>
                <Col >Currency</Col>
                <Col >Action</Col>
            </Row>
            {Rows}
        </Container>        
        <PhoneNumbersModal number={editingNumber} show={showModal} onClosed={()=>{ setShowModal(false);  setEditingNumber({}); }} />
    </div>
    );
}
