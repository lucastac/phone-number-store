import React, { useState } from 'react';
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

    // Selectors
    const pagination = useSelector(selectPagination);

    // Handle update page
    const handleUpdatePage = (page) => {
        dispatch(setPaginationPage(page));
    };

    // Handle update perPage
    const handleUpdatePerPage = (perPage) => {
        dispatch(setPaginationPerPage(perPage));
        dispatch(setPaginationPage(1));
    };

    /////////////////////////////////
    //    MOUNT THE PAGINATION     //
    /////////////////////////////////

    let totalPages = Math.ceil(Math.max(1, pagination.total / pagination.pageSelect.perPage));

    var Begin;
    let Middle = [];
    var End;

    // Mount the Begin part of the pagination
    if (pagination.pageSelect.page > 3)
    {
        Begin = (
            <>
                <Pagination.Prev onClick={() => { handleUpdatePage(pagination.pageSelect.page - 1);}}/>
                <Pagination.Item onClick={() => { handleUpdatePage(1);}}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
            </>
        );
    } else {
        Begin = (<></>);
    }

    // Mount the Middle part of the pagination
    for (let number = pagination.pageSelect.page - 2; number <= pagination.pageSelect.page + 2; number++) {
        if (number <= 0 || number > totalPages) continue;
        Middle.push(
            <Pagination.Item key={number} active={number === pagination.pageSelect.page} onClick={() => { handleUpdatePage(number);}}>
            {number}
            </Pagination.Item>,
        );
    }

    // Mount the End part of the pagination
    if (pagination.pageSelect.page < totalPages - 2)
    {
        End = (
            <>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => { handleUpdatePage(totalPages);}}>{totalPages}</Pagination.Item>
                <Pagination.Next onClick={() => { handleUpdatePage(pagination.pageSelect.page + 1);}}/>
            </>
        );
    } else {
        End = (<></>);
    }

    var Pages = (
        <>
            {Begin}
            {Middle}
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
                        <Form.Control onChange={(event) => {handleUpdatePerPage(event.target.value);}} value={pagination.pageSelect.perPage} as="select">
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
