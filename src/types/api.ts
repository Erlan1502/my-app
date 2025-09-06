export interface UserProfile {
  email: string;
  selectedCourses: string[]; // Массив ID курсов
}

export interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  workouts: string[];
}

export interface CourseDetails extends Course {
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
}

export interface CourseDetailsStatic {
  nameRU: string;
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  imageUrl?: string;
}
export interface Exercise {
  _id: string;
  name: string;
  quantity: number;
}

export interface Workout {
  _id: string;
  name: string;
  video: string;
  exercises: Exercise[];
}

export interface WorkoutProgress {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
}

export interface CourseProgress {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
}
