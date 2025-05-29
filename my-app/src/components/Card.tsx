import { cardInterface } from '../types'
import styles from './Card.module.css'
import { Basic as Dropzone } from './drop';

function Card({ title, description, description2, ...props }: cardInterface) {
  return (
    <article className={`stack-lg ${styles.card}`}>
      
      <div className='stack-sm'>
<h3 className={styles.title}>{title}</h3>
{description && (
  <>
    <small className={styles.description}>{description}</small>
    <small className={styles.description2}>{description2}</small>
  </>
)}
      </div>
      <Dropzone />
    </article>
  );
}
export default Card;
