import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';

import {
    createNumberServer,
    updateNumberServer
} from '../phoneNumbersSlice';

export function PhoneNumbersModal({show, onClosed, number}) {
    const dispatch = useDispatch();
    var formNumber = JSON.parse(JSON.stringify(number));
    const modalTitle = formNumber.id ? 'Edit Number' : 'New Number'; // Change title deppending if is editing or creating

    // If is creating, then set default values for the form
    if (!formNumber.id)
    {
        formNumber.value = "";
        formNumber.monthyPrice = 0;
        formNumber.setupPrice = 0;
        formNumber.currency = "U$";
    }

    // Handle Close Modal click
    const handleCloseModal = () => {
        onClosed();
    };

    // Handle Save Number click
    const handleSaveNumber = () => {
        if (formNumber.id)
        {
            dispatch(updateNumberServer(formNumber));
        } else {
            dispatch(createNumberServer(formNumber));
        }
        onClosed();
    };

    // Handle when a field changes it value
    const handleValueChanged = (field, event) => {
        formNumber[field] = event.target.value;     
    };

    return (
    <>
        <Modal show={show} onHide={handleCloseModal} centered>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="formNumberValue">
                        <Form.Label>Number</Form.Label>
                        <Form.Control onChange={(event) => {handleValueChanged('value', event);}} defaultValue={formNumber.value} type="text" placeholder="Enter the number" />
                    </Form.Group>
                    <Form.Group controlId="formNumberMonthyPrice">
                        <Form.Label>Monthy Price</Form.Label>
                        <Form.Control onChange={(event) => {handleValueChanged('monthyPrice', event);}} defaultValue={formNumber.monthyPrice} type="number" placeholder="Enter the monthy price" />
                    </Form.Group>
                    <Form.Group controlId="formNumberSetupPrice">
                        <Form.Label>Setup Price</Form.Label>
                        <Form.Control onChange={(event) => {handleValueChanged('setupPrice', event);}} defaultValue={formNumber.setupPrice} type="text" placeholder="Enter the setup price" />
                    </Form.Group>
                    <Form.Group controlId="formNumberCurrency">
                        <Form.Label>Currency</Form.Label>
                        <Form.Control onChange={(event) => {handleValueChanged('currency', event);}} defaultValue={formNumber.currency} as="select">
                            <option>U$</option>
                            <option>R$</option>
                            <option>EUR</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveNumber}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>                
                </Modal.Footer>
            </Form>
        </Modal>
    </>
    );
}
