import { useState, useMemo, useCallback } from 'react';
import { ConfigurableParams, StatCardData, DEFAULT_PARAMS } from '../types/stats';
import { 
  PersonalMilestone, 
  CulturalProfile, 
  DEFAULT_CULTURAL_PROFILE 
} from '../types/milestones';
import { 
  AdvancedLifeCalculator, 
  AdvancedLifeStats, 
  generateAdvancedFunFact 
} from '../utils/advancedCalculations';
import { validateBirthDate } from '../utils/dateHelpers';
import { useLocalStorage } from './useLocalStorage';

export const useAdvancedLifeStats = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [params, setParams] = useLocalStorage<ConfigurableParams>('advanced-life-stats-params', DEFAULT_PARAMS);
  const [personalMilestones, setPersonalMilestones] = useLocalStorage<PersonalMilestone[]>('personal-milestones', []);
  const [culturalProfile, setCulturalProfile] = useLocalStorage<CulturalProfile>('cultural-profile', DEFAULT_CULTURAL_PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate birth date whenever it changes
  const validation = useMemo(() => {
    return validateBirthDate(birthDate);
  }, [birthDate]);

  // Calculate advanced life stats whenever dependencies change
  const advancedLifeStats = useMemo((): AdvancedLifeStats | null => {
    if (!birthDate || !validation.isValid) {
      return null;
    }

    const calculator = new AdvancedLifeCalculator({
      birthDate,
      personalMilestones,
      culturalProfile,
      params,
    });

    return calculator.calculateAdvancedStats();
  }, [birthDate, params, personalMilestones, culturalProfile, validation.isValid]);

  // Generate enhanced stat cards with developmental awareness
  const statCards = useMemo((): StatCardData[] => {
    if (!advancedLifeStats || !birthDate) return [];

    const context = {
      birthDate,
      personalMilestones,
      culturalProfile,
      params,
    };

    return [
      {
        id: 'daysLived',
        title: 'Days Lived',
        value: advancedLifeStats.daysLived,
        unit: 'days',
        icon: 'calendar',
        funFact: generateAdvancedFunFact('daysLived', advancedLifeStats.daysLived, context),
        color: '#007AFF',
        gradient: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
      },
      {
        id: 'hoursSlept',
        title: 'Hours Slept',
        value: advancedLifeStats.hoursSlept,
        unit: 'hours',
        icon: 'moon',
        funFact: generateAdvancedFunFact('hoursSlept', advancedLifeStats.hoursSlept, context),
        color: '#5856D6',
        gradient: 'linear-gradient(135deg, #5856D6 0%, #AF52DE 100%)',
      },
      {
        id: 'totalHeartbeats',
        title: 'Heartbeats',
        value: advancedLifeStats.totalHeartbeats,
        unit: 'beats',
        icon: 'heart',
        funFact: generateAdvancedFunFact('totalHeartbeats', advancedLifeStats.totalHeartbeats, context),
        color: '#FF3B30',
        gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)',
      },
      {
        id: 'breathsTaken',
        title: 'Breaths Taken',
        value: advancedLifeStats.breathsTaken,
        unit: 'breaths',
        icon: 'wind',
        funFact: generateAdvancedFunFact('breathsTaken', advancedLifeStats.breathsTaken, context),
        color: '#34C759',
        gradient: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
      },
      {
        id: 'stepsWalked',
        title: 'Steps Walked',
        value: advancedLifeStats.stepsWalked,
        unit: 'steps',
        icon: 'footprints',
        funFact: generateAdvancedFunFact('stepsWalked', advancedLifeStats.stepsWalked, context),
        color: '#5AC8FA',
        gradient: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
      },
      {
        id: 'cupsOfCoffee',
        title: 'Cups of Coffee',
        value: advancedLifeStats.cupsOfCoffee,
        unit: 'cups',
        icon: 'coffee',
        funFact: generateAdvancedFunFact('cupsOfCoffee', advancedLifeStats.cupsOfCoffee, context),
        color: '#8E4EC6',
        gradient: 'linear-gradient(135deg, #8E4EC6 0%, #5856D6 100%)',
      },
      {
        id: 'booksCouldRead',
        title: 'Books Could Read',
        value: advancedLifeStats.booksCouldRead,
        unit: 'books',
        icon: 'book',
        funFact: generateAdvancedFunFact('booksCouldRead', advancedLifeStats.booksCouldRead, context),
        color: '#AF52DE',
        gradient: 'linear-gradient(135deg, #AF52DE 0%, #FF2D92 100%)',
      },
      {
        id: 'moviesWatched',
        title: 'Movies Watched',
        value: advancedLifeStats.moviesWatched,
        unit: 'movies',
        icon: 'film',
        funFact: generateAdvancedFunFact('moviesWatched', advancedLifeStats.moviesWatched, context),
        color: '#FF2D92',
        gradient: 'linear-gradient(135deg, #FF2D92 0%, #FF3B30 100%)',
      },
      {
        id: 'earthDistanceTraveled',
        title: 'Distance with Earth',
        value: advancedLifeStats.earthDistanceTraveled,
        unit: 'km',
        icon: 'globe',
        funFact: generateAdvancedFunFact('earthDistanceTraveled', advancedLifeStats.earthDistanceTraveled, context),
        color: '#32D74B',
        gradient: 'linear-gradient(135deg, #32D74B 0%, #34C759 100%)',
      },
    ];
  }, [advancedLifeStats, birthDate, personalMilestones, culturalProfile, params]);

  // Enhanced stat cards with milestone information
  const enhancedStatCards = useMemo((): (StatCardData & { milestoneInfo?: string })[] => {
    if (!advancedLifeStats) return statCards;

    return statCards.map(card => {
      let milestoneInfo = '';
      
      switch (card.id) {
        case 'stepsWalked':
          if (advancedLifeStats.yearsWalking > 0) {
            milestoneInfo = `Walking for ${advancedLifeStats.yearsWalking} years`;
          } else {
            milestoneInfo = 'Walking milestone not yet reached';
          }
          break;
        case 'cupsOfCoffee':
          if (advancedLifeStats.yearsCoffeeConsumption > 0) {
            milestoneInfo = `Drinking coffee for ${advancedLifeStats.yearsCoffeeConsumption} years`;
          } else {
            milestoneInfo = 'Coffee journey awaits';
          }
          break;
        case 'booksCouldRead':
          if (advancedLifeStats.yearsReading > 0) {
            milestoneInfo = `Reading independently for ${advancedLifeStats.yearsReading} years`;
          } else {
            milestoneInfo = 'Reading adventure coming soon';
          }
          break;
      }

      return {
        ...card,
        milestoneInfo: milestoneInfo || undefined,
      };
    });
  }, [statCards, advancedLifeStats]);

  // Update birth date with validation
  const updateBirthDate = useCallback((date: Date | null) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      setBirthDate(date);
      
      if (date) {
        const validation = validateBirthDate(date);
        if (!validation.isValid) {
          setError(validation.error || 'Invalid birth date');
        }
      }
      
      setIsLoading(false);
    }, 300);
  }, []);

  // Update parameters
  const updateParams = useCallback((newParams: ConfigurableParams) => {
    setParams(newParams);
  }, [setParams]);

  // Update personal milestones
  const updatePersonalMilestones = useCallback((milestones: PersonalMilestone[]) => {
    setPersonalMilestones(milestones);
  }, [setPersonalMilestones]);

  // Update cultural profile
  const updateCulturalProfile = useCallback((profile: CulturalProfile) => {
    setCulturalProfile(profile);
  }, [setCulturalProfile]);

  // Reset to defaults
  const resetAll = useCallback(() => {
    setParams(DEFAULT_PARAMS);
    setPersonalMilestones([]);
    setCulturalProfile(DEFAULT_CULTURAL_PROFILE);
  }, [setParams, setPersonalMilestones, setCulturalProfile]);

  // Clear all data
  const clearData = useCallback(() => {
    setBirthDate(null);
    setError(null);
    resetAll();
  }, [resetAll]);

  // Get developmental context
  const developmentalContext = useMemo(() => {
    return advancedLifeStats?.developmentalContext || {
      currentPhase: 'Unknown',
      milestonesAchieved: [],
      upcomingMilestones: [],
    };
  }, [advancedLifeStats]);

  return {
    // State
    birthDate,
    params,
    personalMilestones,
    culturalProfile,
    advancedLifeStats,
    statCards: enhancedStatCards,
    isLoading,
    error,
    validation,
    developmentalContext,
    
    // Actions
    updateBirthDate,
    updateParams,
    updatePersonalMilestones,
    updateCulturalProfile,
    resetAll,
    clearData,
    
    // Computed
    hasValidData: !!birthDate && validation.isValid,
    currentLifePhase: developmentalContext.currentPhase,
    milestonesAchieved: developmentalContext.milestonesAchieved.length,
    upcomingMilestones: developmentalContext.upcomingMilestones.length,
  };
};