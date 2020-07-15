import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import styles from './PhoneNumbersFilter.module.css';

import {
    setId,
    setValue,
    setMonthyPrice,
    setSetupPrice,
    setCurrency
} from './phoneNumbersFilterSlice';

export function PhoneNumbersFilter() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state);
    
    const handleFilterChanged = (field, event) => {
        switch (field) {
            case 'id':
                dispatch(setId(event.target.value));
                break;

            case 'value':
                dispatch(setValue(event.target.value));
                break;

            case 'monthyPrice':
                dispatch(setMonthyPrice(event.target.value));
                break;

            case 'setupPrice':
                dispatch(setSetupPrice(event.target.value));
                break;

            case 'currency':
                dispatch(setCurrency(event.target.value));
                break;
        }
        
    };

    return (
    <div>
        <Container className={styles.filter}>
            <Form.Label>Filter</Form.Label>
                <Row id="TableNumbersFilter">
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterId">ID</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { handleFilterChanged('id', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterValue">Number</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { handleFilterChanged('value', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterMonthyPrice">Monthy Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { handleFilterChanged('monthyPrice', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterSetupPrice">Setup Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { handleFilterChanged('setupPrice', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterCurrency">Currency</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { handleFilterChanged('currency', event); } } />
                        </InputGroup>
                    </Col>
                </Row>
        </Container>
    </div>
    );
}
