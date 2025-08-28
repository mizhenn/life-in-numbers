import { useState, useMemo, useCallback } from 'react';
import { ConfigurableParams, StatCardData, DEFAULT_PARAMS } from '../types/stats';
import { calculateLifeStats, formatNumber, generateFunFact } from '../utils/calculations';
import { validateBirthDate } from '../utils/dateHelpers';
import { useLocalStorage } from './useLocalStorage';

export const useLifeStats = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [params, setParams] = useLocalStorage<ConfigurableParams>('life-stats-params', DEFAULT_PARAMS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate birth date whenever it changes
  const validation = useMemo(() => {
    return validateBirthDate(birthDate);
  }, [birthDate]);

  // Calculate life stats whenever birth date or params change
  const lifeStats = useMemo(() => {
    if (!birthDate || !validation.isValid) {
      return null;
    }
    return calculateLifeStats(birthDate, params);
  }, [birthDate, params, validation.isValid]);

  // Generate stat cards data
  const statCards = useMemo((): StatCardData[] => {
    if (!lifeStats) return [];

    return [
      {
        id: 'daysLived',
        title: 'Days Lived',
        value: lifeStats.daysLived,
        unit: 'days',
        icon: 'calendar',
        funFact: generateFunFact('daysLived', lifeStats.daysLived),
        color: '#007AFF',
        gradient: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
      },
      {
        id: 'hoursSlept',
        title: 'Hours Slept',
        value: lifeStats.hoursSlept,
        unit: 'hours',
        icon: 'moon',
        funFact: generateFunFact('hoursSlept', lifeStats.hoursSlept),
        color: '#5856D6',
        gradient: 'linear-gradient(135deg, #5856D6 0%, #AF52DE 100%)',
      },
      {
        id: 'totalHeartbeats',
        title: 'Heartbeats',
        value: lifeStats.totalHeartbeats,
        unit: 'beats',
        icon: 'heart',
        funFact: generateFunFact('totalHeartbeats', lifeStats.totalHeartbeats),
        color: '#FF3B30',
        gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)',
      },
      {
        id: 'breathsTaken',
        title: 'Breaths Taken',
        value: lifeStats.breathsTaken,
        unit: 'breaths',
        icon: 'wind',
        funFact: generateFunFact('breathsTaken', lifeStats.breathsTaken),
        color: '#34C759',
        gradient: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
      },
      {
        id: 'mealsConsumed',
        title: 'Meals Consumed',
        value: lifeStats.mealsConsumed,
        unit: 'meals',
        icon: 'utensils',
        funFact: generateFunFact('mealsConsumed', lifeStats.mealsConsumed),
        color: '#FF9500',
        gradient: 'linear-gradient(135deg, #FF9500 0%, #FF6B35 100%)',
      },
      {
        id: 'stepsWalked',
        title: 'Steps Walked',
        value: lifeStats.stepsWalked,
        unit: 'steps',
        icon: 'footprints',
        funFact: generateFunFact('stepsWalked', lifeStats.stepsWalked),
        color: '#5AC8FA',
        gradient: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
      },
      {
        id: 'cupsOfCoffee',
        title: 'Cups of Coffee',
        value: lifeStats.cupsOfCoffee,
        unit: 'cups',
        icon: 'coffee',
        funFact: generateFunFact('cupsOfCoffee', lifeStats.cupsOfCoffee),
        color: '#8E4EC6',
        gradient: 'linear-gradient(135deg, #8E4EC6 0%, #5856D6 100%)',
      },
      {
        id: 'booksCouldRead',
        title: 'Books Could Read',
        value: lifeStats.booksCouldRead,
        unit: 'books',
        icon: 'book',
        funFact: generateFunFact('booksCouldRead', lifeStats.booksCouldRead),
        color: '#AF52DE',
        gradient: 'linear-gradient(135deg, #AF52DE 0%, #FF2D92 100%)',
      },
      {
        id: 'moviesWatched',
        title: 'Movies Watched',
        value: lifeStats.moviesWatched,
        unit: 'movies',
        icon: 'film',
        funFact: generateFunFact('moviesWatched', lifeStats.moviesWatched),
        color: '#FF2D92',
        gradient: 'linear-gradient(135deg, #FF2D92 0%, #FF3B30 100%)',
      },
      {
        id: 'earthDistanceTraveled',
        title: 'Distance Traveled with Earth',
        value: lifeStats.earthDistanceTraveled,
        unit: 'km',
        icon: 'globe',
        funFact: generateFunFact('earthDistanceTraveled', lifeStats.earthDistanceTraveled),
        color: '#32D74B',
        gradient: 'linear-gradient(135deg, #32D74B 0%, #34C759 100%)',
      },
    ];
  }, [lifeStats]);

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
  const updateParams = useCallback((newParams: Partial<ConfigurableParams>) => {
    setParams((prev: ConfigurableParams) => ({ ...prev, ...newParams }));
  }, [setParams]);

  // Reset to defaults
  const resetParams = useCallback(() => {
    setParams(DEFAULT_PARAMS);
  }, [setParams]);

  // Clear all data
  const clearData = useCallback(() => {
    setBirthDate(null);
    setError(null);
    setParams(DEFAULT_PARAMS);
  }, [setParams]);

  return {
    // State
    birthDate,
    params,
    lifeStats,
    statCards,
    isLoading,
    error,
    validation,
    
    // Actions
    updateBirthDate,
    updateParams,
    resetParams,
    clearData,
    
    // Computed
    hasValidData: !!birthDate && validation.isValid,
    formattedStats: statCards.map(card => ({
      ...card,
      formattedValue: formatNumber(card.value),
    })),
  };
};