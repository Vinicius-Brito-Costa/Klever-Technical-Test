import styles from './../css/Unconfirmed.module.css';
export default function Unconfirmed(props){
    const unconfirmedValue = props.value.toString();
    return(
        <section className={styles.container}>
            <p>Unconfirmed</p>
            <h3>{unconfirmedValue.length > 10 ? unconfirmedValue.substring(0, 9): unconfirmedValue}</h3>
        </section>
    )
}