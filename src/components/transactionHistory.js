import { useState, useEffect } from 'react';
import styles from './../css/TransactionHist.module.css';
import Transaction from './transaction';
export default function TransactionHistory(props) {
    return (
        <ul className={styles.container}>
            {props.transactions.map((item, key) => {
                return <li key={key}>
                    <Transaction txid={item.txid} value={item.value / 10000000} confirmed={item.confirmations >= 2} />
                </li>
            })}
        </ul>
    );
}