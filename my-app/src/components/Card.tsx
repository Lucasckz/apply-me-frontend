import { cardInterface } from '../types'
import styles from './Card.module.css'
import { Basic as Dropzone } from './drop';

function Card({ title, description, description2, ...props }: cardInterface) {
  return (
    <article className={`stack-lg ${styles.card}`}>
      <div >
        <h3 className={styles.title}>{title}</h3>
        {/* Accent image under the title */}
        <img
          src="/arrow.png" // Change this to your image path
          alt=""
          className={styles.accentImage}
          aria-hidden="true"
        />
        <div className='stack-sm'>
        {description && (
          <>
            <small className={styles.description}>{description}</small>
            <small className={styles.description2}>{description2}</small>
          </>
        )}
        </div>
      </div>
      <Dropzone />
    </article>
  );
}
export default Card;
