import { LifeStats, ConfigurableParams } from '../types/stats';

export const calculateLifeStats = (
  birthDate: Date,
  params: ConfigurableParams
): LifeStats => {
  const now = new Date();
  const ageInMilliseconds = now.getTime() - birthDate.getTime();
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const ageInMinutes = Math.floor(ageInMilliseconds / (1000 * 60));
  const ageInYears = ageInDays / 365.25;

  // Calculate each statistic
  const daysLived = ageInDays;
  const hoursSlept = Math.floor(ageInDays * params.sleepHoursPerDay);
  const totalHeartbeats = Math.floor(ageInMinutes * params.heartRatePerMinute);
  const breathsTaken = Math.floor(ageInMinutes * params.breathsPerMinute);
  const mealsConsumed = Math.floor(ageInDays * params.mealsPerDay);
  const stepsWalked = Math.floor(ageInDays * params.stepsPerDay);
  const cupsOfCoffee = Math.floor(ageInDays * params.cupsOfCoffeePerDay);
  
  // Books calculation: total reading time / time per book
  const totalReadingHours = ageInDays * 2; // assume 2 hours reading per day
  const hoursPerBook = params.averageBookPages / params.readingSpeedPagesPerHour;
  const booksCouldRead = Math.floor(totalReadingHours / hoursPerBook);
  
  // Movies calculation: assume 2 movies per week
  const moviesWatched = Math.floor((ageInDays / 7) * 2);
  
  // Earth distance: Earth travels ~940 million km around sun per year
  const earthDistanceTraveled = Math.floor(ageInYears * 940000000);

  return {
    daysLived,
    hoursSlept,
    totalHeartbeats,
    breathsTaken,
    mealsConsumed,
    stepsWalked,
    cupsOfCoffee,
    booksCouldRead,
    moviesWatched,
    earthDistanceTraveled,
  };
};

export const formatNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toLocaleString();
};

export const generateFunFact = (statType: string, value: number): string => {
  const facts: Record<string, (val: number) => string> = {
    daysLived: (val) => `That's ${Math.floor(val / 365.25)} years of amazing experiences!`,
    hoursSlept: (val) => `You've spent ${Math.floor(val / 24 / 365.25)} years dreaming!`,
    totalHeartbeats: (val) => `Enough heartbeats to power a small city for ${Math.floor(val / 100000)} days!`,
    breathsTaken: (val) => `You've inhaled enough air to fill ${Math.floor(val / 1000)} hot air balloons!`,
    mealsConsumed: (val) => `That's enough food to feed a family of 4 for ${Math.floor(val / (3 * 4 * 365))} years!`,
    stepsWalked: (val) => `You've walked approximately ${Math.floor(val * 0.0008)} km - that's ${Math.floor(val * 0.0008 / 40075)} times around Earth!`,
    cupsOfCoffee: (val) => `Enough caffeine to keep you awake for ${Math.floor(val * 6)} extra hours!`,
    booksCouldRead: (val) => `That's a personal library of ${val} books - you're practically a scholar!`,
    moviesWatched: (val) => `You've spent ${Math.floor(val * 2)} hours being entertained!`,
    earthDistanceTraveled: (val) => `You've traveled ${Math.floor(val / 1000000)} million km through space on Earth!`,
  };

  return facts[statType]?.(value) || 'What an incredible journey!';
};