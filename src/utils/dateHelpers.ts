export const validateBirthDate = (date: Date | null): { isValid: boolean; error?: string } => {
  if (!date) {
    return { isValid: false, error: 'Please enter your birth date' };
  }

  const now = new Date();
  const minDate = new Date(1900, 0, 1);
  
  if (date > now) {
    return { isValid: false, error: 'Birth date cannot be in the future' };
  }
  
  if (date < minDate) {
    return { isValid: false, error: 'Birth date cannot be before 1900' };
  }

  // Check if person would be older than 150 years
  const age = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (age > 150) {
    return { isValid: false, error: 'Please enter a valid birth date' };
  }

  return { isValid: true };
};

export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDateFromInput = (dateString: string): Date | null => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  
  return date;
};

export const getAge = (birthDate: Date): { years: number; months: number; days: number } => {
  const now = new Date();
  const birth = new Date(birthDate);
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

export const getTimeUntilNextBirthday = (birthDate: Date): { days: number; hours: number; minutes: number } => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  
  // If birthday has passed this year, set to next year
  if (nextBirthday < now) {
    nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
  }

  const timeDiff = nextBirthday.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};