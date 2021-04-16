import styles from './../css/Confirmed.module.css';
export default function Confirmed(props){
    const confirmedValue = props.value.toString();
    return(
        <section className={styles.container}>
            <p>Confirmed</p>
            <h3>{confirmedValue.length > 10 ? confirmedValue.substring(0, 9): confirmedValue}</h3>
        </section>
    )
}