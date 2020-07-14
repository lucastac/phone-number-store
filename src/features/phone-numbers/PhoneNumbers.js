import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './PhoneNumbers.module.css';

import { 
    selectNumbers 
} from './phoneNumbersSlice';

export function PhoneNumbers() {
  const numbers = useSelector(selectNumbers);
  console.log(numbers);
  const dispatch = useDispatch();
  //const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <Container>
          <Row id="TableNumbersHeader" className={styles.header}>
              <Col >ID</Col>
              <Col >Number</Col>
              <Col >Monthy Price</Col>
              <Col >SetupPrice</Col>
              <Col >Currency</Col>
          </Row>
          {numbers.map(number => (
            <Row id={number.id} className={styles.row}>
                <Col >{number.id}</Col>
                <Col >{number.value}</Col>
                <Col >{number.monthyPrice}</Col>
                <Col >{number.setupPrice}</Col>
                <Col >{number.currency}</Col>
            </Row>
          ))}
      </Container>
    </div>
  );
}
