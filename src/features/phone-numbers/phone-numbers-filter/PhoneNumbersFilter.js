import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import styles from './PhoneNumbersFilter.module.css';
import { debounce } from "lodash";

import {
    setFilterId,
    setFilterValue,
    setFilterMonthyPrice,
    setFilterSetupPrice,
    setFilterCurrency,
    setPaginationPage,
    selectFilter
} from '../phoneNumbersSlice';


export function PhoneNumbersFilter() {
    const dispatch = useDispatch();

    // Selectors
    const filter = useSelector(selectFilter);

    // Dispatch the new value when the filter is changed
    const updateFilter = (field, value) => {
        switch (field) {
            case 'id':
                dispatch(setFilterId(value));
                break;

            case 'value':
                dispatch(setFilterValue(value));
                break;

            case 'monthyPrice':
                dispatch(setFilterMonthyPrice(value));
                break;

            case 'setupPrice':
                dispatch(setFilterSetupPrice(value));
                break;

            case 'currency':
                dispatch(setFilterCurrency(value));
                break;
        }

        dispatch(setPaginationPage(1));
    };
    
    // Handle when some field id changed
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
