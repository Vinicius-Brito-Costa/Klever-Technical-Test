import { useState, useEffect } from 'react';
import arrowUp from './../image/diagonal-arrow-up.png';
import arrowDown from './../image/diagonal-arrow-down.png';
import check from './../image/check.svg';
import clock from './../image/clock.svg';
import styles from './../css/Transaction.module.css';

export default function Transaction(props) {
    const [arrow, setArrow] = useState(arrowUp);
    const [confirmed, setConfirmed] = useState({ message: 'CONFIRMED', img: check });

    useEffect(() => {
        let notConfirmed = !props.confirmed;
        if (notConfirmed) {
            let obj = {
                message: 'unconfirmed',
                img: clock
            }
            setConfirmed(obj);
            setArrow(arrowDown);
        }
        else{
            let obj = {
                message: 'confirmed',
                img: check
            }
            setConfirmed(obj);
            setArrow(arrowUp);
        }
    }, [])

    const Config = () => {

    }
    return (
        <section className={styles.container}>
            <header>
                <div>
                    <button className={styles.status}>{confirmed.message.toUpperCase()}</button>
                    <img src={confirmed.img} alt='' className={styles[confirmed.message]} />
                </div>
                <div>
                    <span>{(props.value).toString().substr(0, 8)}</span> BTC <img className={styles.arrow} src={arrow} alt='' />
                </div>
            </header>

            <main>
                <p>TRANSACTION: </p>
                <span>{props.txid}</span>
            </main>
        </section>
    );
}