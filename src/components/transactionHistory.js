import { useState, useEffect } from 'react';
import styles from './../css/TransactionHist.module.css';
import Transaction from './transaction';
export default function TransactionHistory(props) {
    return (
        <ul className={styles.container}>
            {props.transactions.map((item, key) => {
                return <li key={key}>
                    <Transaction txid={item.txid} value={toFixed(item.value / 100000000)} confirmed={item.confirmations >= 2} />
                </li>
            })}
        </ul>
    );
}
function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }