import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Pagination, Form, Row, Col } from 'react-bootstrap';
import styles from './PhoneNumbersPagination.module.css';

import {
    setPaginationPage,
    setPaginationPerPage,
    selectPagination
} from '../phoneNumbersSlice';


export function PhoneNumbersPagination() {
    const dispatch = useDispatch();
    const pagination = useSelector(selectPagination);

    const updatePage = (page) => {
        dispatch(setPaginationPage(page));
    };

    const updatePerPage = (perPage) => {
        dispatch(setPaginationPerPage(perPage));
        dispatch(setPaginationPage(1));
    };

    let totalPages = Math.max(1, pagination.total / pagination.pageSelect.perPage);
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === pagination.pageSelect.page} onClick={() => { updatePage(number);}}>
            {number}
            </Pagination.Item>,
        );
    }


    return (
    <div>
        <Container>
            <Row className={styles.pagination}>
                <Col xs={2}>
                    <Form.Group controlId="numbersPerPage">
                        <Form.Label>Numbers per page</Form.Label>
                        <Form.Control onChange={(event) => {updatePerPage(event.target.value);}} value={pagination.pageSelect.perPage} as="select">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Pagination>{items}</Pagination>
                </Col>
            </Row>
        </Container>        
    </div>
    );
}
