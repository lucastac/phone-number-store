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
    selectLoading,
    selectRefreshData
} from './phoneNumbersSlice';

export function PhoneNumbers() {
    const dispatch = useDispatch();

    // Local variables
    const [showModal, setShowModal] = useState(false);
    const [editingNumber, setEditingNumber] = useState({});

    // Selectors
    const isLoading = useSelector(selectLoading);
    const numbers = useSelector(selectNumbers);
    const filter = useSelector(selectFilter);
    const pagination = useSelector(selectPaginationPageSelect);
    const refreshData = useSelector(selectRefreshData);
    
    // Dispatch Numbers to update when needed
    React.useEffect(() =>{
        dispatch(retrieveNumbers(filter, pagination));
    }, [refreshData, filter, pagination]);

    // Handle delete number click
    const handleRemoveNumber = (number) => {
        dispatch(removeNumberServer(number))
    }

    var Rows;
    if (isLoading) // If is loading, show loading spinner
    {
        Rows =(
            <Row className={styles.spinner}>
                <span>Loading...</span>
                <Spinner animation="border" role="status">
                </Spinner>
            </Row>   
            );
    } else if(numbers.length == 0) { // If the list is empty, inform this to the user
        Rows =(
            <Row className={styles.spinner}>
                <span>No numbers match filtering</span>
            </Row>   
        );
    } else { // Show the filtered numbers
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
                        <Button variant="danger" onClick={() => { handleRemoveNumber(number);}}>Delete</Button>
                    </Col>
                </Row>
            ))}
            </>
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
