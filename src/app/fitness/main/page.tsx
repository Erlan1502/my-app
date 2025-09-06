import styles from './main.module.css';
import CourseCard from '@/components/CourseCard/CourseCard';
export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        Онлайн-тренировки для занятий дома
      </div>
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
          nameRU="Йога"
          imageUrl="/img/Yoga.png"
          durationInDays={25}
          dailyDurationInMinutes={{ from: 20, to: 50 }}
          difficulty="Сложно"
        />
        <CourseCard
          nameRU="Стретчинг"
          imageUrl="/img/Stretching.png"
          durationInDays={25}
          dailyDurationInMinutes={{ from: 20, to: 50 }}
          difficulty="Сложно"
        />
        <CourseCard
          nameRU="Фитнес"
          imageUrl="/img/Fitness.png"
          durationInDays={25}
          dailyDurationInMinutes={{ from: 20, to: 50 }}
          difficulty="Сложно"
        />
        <CourseCard
          nameRU="Степ-аэробика"
          imageUrl="/img/Step-aerobic.png"
          durationInDays={25}
          dailyDurationInMinutes={{ from: 20, to: 50 }}
          difficulty="Сложно"
        />
        <CourseCard
          nameRU="Бодифлекс"
          imageUrl="/img/Body-flex.png"
          durationInDays={25}
          dailyDurationInMinutes={{ from: 20, to: 50 }}
          difficulty="Сложно"
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerButton}>Наверх ↑</div>
      </div>
    </div>
  );
}
