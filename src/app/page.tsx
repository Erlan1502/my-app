import CourseCard from '@/components/CourseCard/CourseCard';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header></Header>
      <div className={styles.hero}>
        <div className={styles.title}>
          Начните заниматься спортом и улучшите качество жизни
        </div>
        <div className={styles.motivation}>
          <svg width="288" height="120">
            <use href="/img/ChangeYourBody.svg"></use>
          </svg>
        </div>
      </div>

      <div className={styles.grid}>
        <CourseCard
          title="Йога"
          imageUrl="/img/Yoga.png"
          duration={25}
          timePerDay="20-50 мин/день"
        />
        <CourseCard
          title="Стретчинг"
          imageUrl="/img/Stretching.png"
          duration={25}
          timePerDay="20-50 мин/день"
        />
        <CourseCard
          title="Фитнес"
          imageUrl="/img/Fitness.png"
          duration={25}
          timePerDay="20-50 мин/день"
        />
        <CourseCard
          title="Степ-аэробика"
          imageUrl="/img/Step-aerobic.png"
          duration={25}
          timePerDay="20-50 мин/день"
        />
        <CourseCard
          title="Бодифлекс"
          imageUrl="/img/Body-flex.png"
          duration={25}
          timePerDay="20-50 мин/день"
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerButton}>Наверх</div>
      </div>
    </div>
  );
}
