import { useState, useEffect } from 'react';
import styles from './css/App.module.css';
import TransactionHistory from './components/transactionHistory';
import Balance from './components/balanceContainer';
import searchIcon from './image/loupe.svg';

function App() {
	let [transactions, setTransactions] = useState([]);
	let [address, setAddress] = useState('');
	let [confBalance, setConfBalance] = useState(0);
	let [unconfBalance, setUnconfBalance] = useState(0);
	useEffect(() => API(), [address])
	const API = async () => {
		let url = 'https://kleverapitest.herokuapp.com/balance/' + address;
		if (address === '') return;
		let apiData = await fetch(url).then(data => data.json());
		let noError = apiData.error === undefined;
		if (noError) {
			let array = apiData.txids;
			let confBalanceValue = apiData.confirmed;
			let unconfBalanceValue = apiData.unconfirmed;
			setConfBalance(confBalanceValue);
			setUnconfBalance(unconfBalanceValue);
			setTransactions(array);
		}
		else{
			setConfBalance(0);
			setUnconfBalance(0);
			setTransactions([
				{
					"txid": "Cannot find this address.",
					"value": 0,
					"confirmations": 1
				}
			]);
			setAddress("");
		}
		console.log(transactions);
	}
	const submit = (e) => {
		e.preventDefault();
		let addr = document.getElementById('address').value;
		setTransactions([]);
		setAddress(addr);
	}
	return (
		<div className={styles.container}>
			<div className={styles.appContainer}>
				<form action='' method='' onSubmit={(e) => submit(e)} className={styles.form}>
					<img className={styles.logo} src={require('./image/logo.png').default} alt='logo' />
					<Balance address={address} confirmed={confBalance} unconfirmed={unconfBalance} />
					<div>
						<input id='address' type='text' placeholder='Bitcoin Address...' required />
						<button>
							<img src={searchIcon} alt='' />
						</button>
					</div>
				</form>
				<TransactionHistory transactions={transactions} />
			</div>
		</div>
	);
}

export default App;
