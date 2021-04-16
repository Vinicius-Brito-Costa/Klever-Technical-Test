import { useState, useEffect } from 'react';
import Confirmed from './confirmed';
import Unconfirmed from './unconfirmed';
import styles from './../css/BalanceContainer.module.css';
export default function BalanceContainer(props) {
    const [totalBalance, setTotalBalance] = useState(1);
    const [price, setPrice] = useState(0);

    useEffect(() => {setBalance()}, [props.address, props.confirmed, props.unconfirmed])

    const setBalance = async () => {
        let balance = props.confirmed + props.unconfirmed;
        setTotalBalance(styleBalance(balance));
        getMonetaryValue();
    }
    const getMonetaryValue = async () => {
        let url = 'https://api.alternative.me/v2/ticker/?convert=USD';
        let btcValue = await fetch(url).then(data => data.json()).then(data => data.data[1].quotes.USD.price);
        setPrice(btcValue);
        return btcValue;
    }

    const styleBalance = (value) => {
        let balance = value.toString();
        if (balance.length < 15) {
            balance.padEnd(15, '0');
        }
        return balance;
    }
    return (
        <section className={styles.container}>
            <header>
                <h3>Address:</h3>
                <h4>{props.address}</h4>
            </header>
            <main>
                <h1>{totalBalance} BTC</h1>
                <h4>= {(price * totalBalance).toLocaleString('en-US')} USD</h4>
            </main>
            <footer>
                <Confirmed value={props.confirmed} />
                <Unconfirmed value={props.unconfirmed} />
            </footer>
        </section>
    )
}