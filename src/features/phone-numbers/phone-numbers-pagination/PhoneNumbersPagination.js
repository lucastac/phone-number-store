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

    let totalPages = Math.ceil(Math.max(1, pagination.total / pagination.pageSelect.perPage));
    let items = [];
    var Pages;
    for (let number = pagination.pageSelect.page - 2; number <= pagination.pageSelect.page + 2; number++) {
        if (number <= 0 || number > totalPages) continue;
        items.push(
            <Pagination.Item key={number} active={number === pagination.pageSelect.page} onClick={() => { updatePage(number);}}>
            {number}
            </Pagination.Item>,
        );
    }

    var Begin;
    var End;

    if (pagination.pageSelect.page > 3)
    {
        Begin = (
            <>
                <Pagination.Prev onClick={() => { updatePage(pagination.pageSelect.page - 1);}}/>
                <Pagination.Item onClick={() => { updatePage(1);}}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
            </>
        );
    } else {
        Begin = (<></>);
    }

    if (pagination.pageSelect.page < totalPages - 2)
    {
        End = (
            <>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => { updatePage(totalPages);}}>{totalPages}</Pagination.Item>
                <Pagination.Next onClick={() => { updatePage(pagination.pageSelect.page + 1);}}/>
            </>
        );
    } else {
        End = (<></>);
    }

    Pages = (
        <>
            {Begin}
            {items}
            {End}
        </>
    );


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
                    <Pagination>{Pages}</Pagination>
                </Col>
            </Row>
        </Container>        
    </div>
    );
}
