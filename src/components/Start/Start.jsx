import styles from './Start.module.css';
import girlImage from '../../assets/girl.png'
import { useNavigate } from "react-router-dom";

function Start() {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
            <h1 className={styles.title}>UmAI - сенин <hr /> адабий дуйнон</h1>
            <p className={styles.subtitle}>Суйуктуу чыгармаларынды окуп, акылдуу ЖИге суроо бер.</p>
            <button className={styles.askButton} onClick={() => {navigate(`/umai`)}}>UmAI  суроо</button>
        </div>
        <img className={styles.image} src={girlImage} alt="" />
      </div> 
    </>
  )
}

export default Start
