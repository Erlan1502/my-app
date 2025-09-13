import styles from './successModal.module.css';

export default function SuccessModal() {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.message}>Ваш прогресс засчитан!</h2>
        <div className={styles.iconContainer}>
          <svg className={styles.checkIcon} width="68" height="68">
            <use href="/img/icon/Big-Check-in-Circle.svg"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
