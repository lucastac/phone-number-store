import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import styles from './PhoneNumbersFilter.module.css';
import { debounce } from "lodash";

import {
    setId,
    setValue,
    setMonthyPrice,
    setSetupPrice,
    setCurrency,
    selectFilter
} from './phoneNumbersFilterSlice';


export function PhoneNumbersFilter() {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);

    const updateFilter = (field, value) => {
        console.log(field);
        switch (field) {
            case 'id':
                dispatch(setId(value));
                break;

            case 'value':
                dispatch(setValue(value));
                break;

            case 'monthyPrice':
                dispatch(setMonthyPrice(value));
                break;

            case 'setupPrice':
                dispatch(setSetupPrice(value));
                break;

            case 'currency':
                dispatch(setCurrency(value));
                break;
        } 
    };
    
    const handleFilterChanged = debounce((field, event) => {           
        var value = event.target.value;
        updateFilter(field, value);          
    }, 500);



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
                            <FormControl  onChange={ (event) => { event.persist(); handleFilterChanged('id', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterValue">Number</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { event.persist(); handleFilterChanged('value', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterMonthyPrice">Monthy Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { event.persist(); handleFilterChanged('monthyPrice', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterSetupPrice">Setup Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { event.persist(); handleFilterChanged('setupPrice', event); } } />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="filterCurrency">Currency</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={ (event) => { event.persist(); handleFilterChanged('currency', event); } } />
                        </InputGroup>
                    </Col>
                </Row>
        </Container>
    </div>
    );
}
