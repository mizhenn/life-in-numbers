export interface LifeStats {
  daysLived: number;
  hoursSlept: number;
  totalHeartbeats: number;
  breathsTaken: number;
  mealsConsumed: number;
  stepsWalked: number;
  cupsOfCoffee: number;
  booksCouldRead: number;
  moviesWatched: number;
  earthDistanceTraveled: number; // km around sun
}

export interface ConfigurableParams {
  sleepHoursPerDay: number; // default: 8
  heartRatePerMinute: number; // default: 70
  stepsPerDay: number; // default: 7000
  cupsOfCoffeePerDay: number; // default: 2
  mealsPerDay: number; // default: 3
  breathsPerMinute: number; // default: 16
  readingSpeedPagesPerHour: number; // default: 50
  averageBookPages: number; // default: 300
  averageMovieMinutes: number; // default: 120
}

export interface StatCardData {
  id: string;
  title: string;
  value: number;
  unit: string;
  icon: string;
  funFact: string;
  color: string;
  gradient: string;
}

export interface BirthdayData {
  birthDate: Date | null;
  isValid: boolean;
  error?: string;
}

export const DEFAULT_PARAMS: ConfigurableParams = {
  sleepHoursPerDay: 8,
  heartRatePerMinute: 70,
  stepsPerDay: 7000,
  cupsOfCoffeePerDay: 2,
  mealsPerDay: 3,
  breathsPerMinute: 16,
  readingSpeedPagesPerHour: 50,
  averageBookPages: 300,
  averageMovieMinutes: 120,
};