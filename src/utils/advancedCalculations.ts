import { 
  LifeStats, 
  ConfigurableParams, 
  DEFAULT_PARAMS 
} from '../types/stats';
import {
  DevelopmentalMilestone,
  PersonalMilestone,
  CulturalProfile,
  DEVELOPMENTAL_MILESTONES,
  DEFAULT_CULTURAL_PROFILE,
  CULTURAL_PROFILES,
  LIFE_PHASES
} from '../types/milestones';

export interface AdvancedLifeStats extends LifeStats {
  // Additional age-aware statistics
  yearsWalking: number;
  yearsDriving: number;
  yearsReading: number;
  yearsCoffeeConsumption: number;
  developmentalContext: {
    currentPhase: string;
    milestonesAchieved: string[];
    upcomingMilestones: string[];
  };
}

export interface CalculationContext {
  birthDate: Date;
  personalMilestones: PersonalMilestone[];
  culturalProfile: CulturalProfile;
  params: ConfigurableParams;
}

export class AdvancedLifeCalculator {
  private context: CalculationContext;

  constructor(context: CalculationContext) {
    this.context = context;
  }

  calculateAdvancedStats(): AdvancedLifeStats {
    const now = new Date();
    const ageInMilliseconds = now.getTime() - this.context.birthDate.getTime();
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const ageInMonths = Math.floor(ageInDays / 30.44); // Average days per month
    const ageInYears = ageInDays / 365.25;

    // Basic stats (same as before but with milestone awareness)
    const basicStats = this.calculateBasicStats(ageInDays, ageInMonths);

    // Advanced milestone-aware stats
    const advancedStats = this.calculateMilestoneAwareStats(ageInMonths, ageInDays);

    // Developmental context
    const developmentalContext = this.getDevelopmentalContext(ageInMonths);

    return {
      ...basicStats,
      ...advancedStats,
      developmentalContext,
    };
  }

  private calculateBasicStats(ageInDays: number, ageInMonths: number): LifeStats {
    const ageInMinutes = ageInDays * 24 * 60;
    const params = this.context.params;

    return {
      daysLived: ageInDays,
      hoursSlept: Math.floor(ageInDays * params.sleepHoursPerDay),
      totalHeartbeats: Math.floor(ageInMinutes * params.heartRatePerMinute),
      breathsTaken: Math.floor(ageInMinutes * params.breathsPerMinute),
      mealsConsumed: Math.floor(ageInDays * params.mealsPerDay),
      stepsWalked: this.calculateStepsWalked(ageInDays, ageInMonths),
      cupsOfCoffee: this.calculateCoffeeConsumption(ageInDays, ageInMonths),
      booksCouldRead: this.calculateBooksRead(ageInDays, ageInMonths),
      moviesWatched: this.calculateMoviesWatched(ageInDays, ageInMonths),
      earthDistanceTraveled: Math.floor((ageInDays / 365.25) * 940000000),
    };
  }

  private calculateMilestoneAwareStats(ageInMonths: number, ageInDays: number) {
    return {
      yearsWalking: this.calculateYearsSinceMilestone('walking', ageInMonths),
      yearsDriving: this.calculateYearsSinceMilestone('driving', ageInMonths),
      yearsReading: this.calculateYearsSinceMilestone('reading', ageInMonths),
      yearsCoffeeConsumption: this.calculateYearsSinceMilestone('coffee_consumption', ageInMonths),
    };
  }

  private calculateStepsWalked(ageInDays: number, ageInMonths: number): number {
    const walkingMilestone = this.getMilestoneStartAge('walking', ageInMonths);
    if (ageInMonths < walkingMilestone) {
      return 0; // Can't walk yet
    }

    const walkingDays = ageInDays - (walkingMilestone * 30.44);
    
    // Progressive step calculation based on age
    let totalSteps = 0;
    const dailySteps = this.context.params.stepsPerDay;

    // Toddler phase (1-3 years): fewer steps
    const toddlerDays = Math.min(walkingDays, 730); // 2 years max
    totalSteps += toddlerDays * (dailySteps * 0.3);

    // Child phase (3-12 years): moderate steps
    const childDays = Math.min(Math.max(walkingDays - 730, 0), 3285); // 9 years
    totalSteps += childDays * (dailySteps * 0.7);

    // Teen/Adult phase: full steps
    const adultDays = Math.max(walkingDays - 4015, 0);
    totalSteps += adultDays * dailySteps;

    return Math.floor(totalSteps);
  }

  private calculateCoffeeConsumption(ageInDays: number, ageInMonths: number): number {
    const coffeeMilestone = this.getMilestoneStartAge('coffee_consumption', ageInMonths);
    if (ageInMonths < coffeeMilestone) {
      return 0; // Too young for coffee
    }

    const coffeeDays = ageInDays - (coffeeMilestone * 30.44);
    const dailyCups = this.context.params.cupsOfCoffeePerDay;
    
    // Check cultural prevalence
    const prevalence = this.context.culturalProfile.activityPrevalence.coffee_consumption || 0.85;
    if (Math.random() > prevalence) {
      return 0; // Person doesn't drink coffee based on cultural probability
    }

    return Math.floor(coffeeDays * dailyCups);
  }

  private calculateBooksRead(ageInDays: number, ageInMonths: number): number {
    const readingMilestone = this.getMilestoneStartAge('reading', ageInMonths);
    if (ageInMonths < readingMilestone) {
      return 0; // Can't read independently yet
    }

    const readingDays = ageInDays - (readingMilestone * 30.44);
    const params = this.context.params;
    
    // Age-based reading progression
    let totalReadingHours = 0;
    
    // Child phase (7-12): 1 hour/day average
    const childReadingDays = Math.min(readingDays, 1825); // 5 years
    totalReadingHours += childReadingDays * 1;
    
    // Teen phase (13-18): 1.5 hours/day
    const teenReadingDays = Math.min(Math.max(readingDays - 1825, 0), 2190); // 6 years
    totalReadingHours += teenReadingDays * 1.5;
    
    // Adult phase: 2 hours/day average
    const adultReadingDays = Math.max(readingDays - 4015, 0);
    totalReadingHours += adultReadingDays * 2;

    const hoursPerBook = params.averageBookPages / params.readingSpeedPagesPerHour;
    return Math.floor(totalReadingHours / hoursPerBook);
  }

  private calculateMoviesWatched(ageInDays: number, ageInMonths: number): number {
    // Movies can be watched from early childhood (around 3 years)
    const movieStartAge = 36; // 3 years in months
    if (ageInMonths < movieStartAge) {
      return 0;
    }

    const movieDays = ageInDays - (movieStartAge * 30.44);
    
    // Age-based movie watching patterns
    let totalMovies = 0;
    
    // Child phase (3-12): 1 movie per week
    const childMovieDays = Math.min(movieDays, 3285); // 9 years
    totalMovies += (childMovieDays / 7) * 1;
    
    // Teen phase (13-18): 2 movies per week
    const teenMovieDays = Math.min(Math.max(movieDays - 3285, 0), 2190); // 6 years
    totalMovies += (teenMovieDays / 7) * 2;
    
    // Adult phase: 1.5 movies per week (busy with work/life)
    const adultMovieDays = Math.max(movieDays - 5475, 0);
    totalMovies += (adultMovieDays / 7) * 1.5;

    return Math.floor(totalMovies);
  }

  private getMilestoneStartAge(milestoneId: string, currentAgeMonths: number): number {
    // Check for personal milestone override
    const personalMilestone = this.context.personalMilestones.find(
      pm => pm.milestoneId === milestoneId
    );
    
    if (personalMilestone?.personalAgeMonths) {
      return personalMilestone.personalAgeMonths;
    }

    // Use cultural profile adjustment
    const milestone = DEVELOPMENTAL_MILESTONES.find(m => m.id === milestoneId);
    if (!milestone) {
      return 0; // Milestone not found, assume from birth
    }

    const culturalAdjustment = this.context.culturalProfile.milestoneAdjustments[milestoneId] || 0;
    const adjustedAge = milestone.typicalAgeMonths + culturalAdjustment;

    // Ensure within realistic bounds
    return Math.max(
      milestone.earliestAgeMonths,
      Math.min(milestone.latestAgeMonths, adjustedAge)
    );
  }

  private calculateYearsSinceMilestone(milestoneId: string, currentAgeMonths: number): number {
    const milestoneAge = this.getMilestoneStartAge(milestoneId, currentAgeMonths);
    if (currentAgeMonths < milestoneAge) {
      return 0; // Haven't reached milestone yet
    }
    return Math.floor((currentAgeMonths - milestoneAge) / 12);
  }

  private getDevelopmentalContext(ageInMonths: number) {
    // Find current life phase
    const currentPhase = LIFE_PHASES.find(
      phase => ageInMonths >= phase.startAgeMonths && ageInMonths < phase.endAgeMonths
    )?.name || 'Unknown';

    // Find achieved milestones
    const milestonesAchieved = DEVELOPMENTAL_MILESTONES
      .filter(milestone => {
        const startAge = this.getMilestoneStartAge(milestone.id, ageInMonths);
        return ageInMonths >= startAge;
      })
      .map(milestone => milestone.name);

    // Find upcoming milestones (within next 5 years)
    const upcomingMilestones = DEVELOPMENTAL_MILESTONES
      .filter(milestone => {
        const startAge = this.getMilestoneStartAge(milestone.id, ageInMonths);
        return ageInMonths < startAge && startAge <= ageInMonths + 60; // Next 5 years
      })
      .map(milestone => milestone.name);

    return {
      currentPhase,
      milestonesAchieved,
      upcomingMilestones,
    };
  }
}

// Enhanced fun fact generation with developmental awareness
export const generateAdvancedFunFact = (
  statType: string, 
  value: number, 
  context: CalculationContext
): string => {
  const ageInMonths = Math.floor(
    (new Date().getTime() - context.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );

  const facts: Record<string, (val: number, age: number) => string> = {
    stepsWalked: (val, age) => {
      if (age < 15) return "You haven't started walking yet, but you will soon!";
      const yearsWalking = Math.floor((age - 15) / 12);
      return `You've been walking for ${yearsWalking} years and covered ${Math.floor(val * 0.0008)} km!`;
    },
    cupsOfCoffee: (val, age) => {
      const coffeeAge = 192; // 16 years default
      if (age < coffeeAge) return "Coffee is still in your future - enjoy your sleep while you can!";
      const yearsOfCoffee = Math.floor((age - coffeeAge) / 12);
      return `${yearsOfCoffee} years of coffee addiction has given you ${val} cups of energy!`;
    },
    booksCouldRead: (val, age) => {
      if (age < 84) return "Reading adventures await you in the coming years!";
      return `Since learning to read, you could have built a library of ${val} books!`;
    },
    moviesWatched: (val, age) => {
      if (age < 36) return "Movie nights are coming soon in your future!";
      return `You've spent ${Math.floor(val * 2)} hours being entertained by movies!`;
    },
  };

  return facts[statType]?.(value, ageInMonths) || 
         `What an incredible journey of ${value.toLocaleString()}!`;
};

// Validation functions for realistic ranges
export const validateMilestoneAge = (
  milestoneId: string, 
  ageMonths: number
): { isValid: boolean; error?: string } => {
  const milestone = DEVELOPMENTAL_MILESTONES.find(m => m.id === milestoneId);
  if (!milestone) {
    return { isValid: false, error: 'Unknown milestone' };
  }

  if (ageMonths < milestone.earliestAgeMonths) {
    return { 
      isValid: false, 
      error: `Too early - earliest typical age is ${Math.floor(milestone.earliestAgeMonths / 12)} years` 
    };
  }

  if (ageMonths > milestone.latestAgeMonths) {
    return { 
      isValid: false, 
      error: `Too late - latest typical age is ${Math.floor(milestone.latestAgeMonths / 12)} years` 
    };
  }

  return { isValid: true };
};

export { DEVELOPMENTAL_MILESTONES, CULTURAL_PROFILES, DEFAULT_CULTURAL_PROFILE };