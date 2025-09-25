import styles from './Card.module.css';

const Card = ({img, name, autor, onClick }) => {

  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <img src={img} alt="" className={styles.BookImg}/>
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.autor}>{autor}</p>
        </div>
      </div>
    </>
  )
}

export default Card
