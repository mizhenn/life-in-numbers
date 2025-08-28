import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, Sparkles } from 'lucide-react';
import { formatDateForInput, parseDateFromInput } from '../../utils/dateHelpers';

const FormContainer = styled(motion.div)`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border-light);
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FormSubtitle = styled.p`
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: var(--spacing-lg);
`;

const InputLabel = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  text-align: left;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DateInput = styled(motion.input)`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  padding-left: 48px;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  background: var(--color-surface-secondary);
  color: var(--color-text);
  font-size: var(--font-size-md);
  font-weight: 500;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
    transform: translateY(-1px);
  }

  &:invalid {
    border-color: var(--color-error);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: var(--spacing-md);
  color: var(--color-text-muted);
  z-index: 1;
  pointer-events: none;
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 59, 48, 0.1);
  border-radius: var(--border-radius-md);
  border: 1px solid rgba(255, 59, 48, 0.2);
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

interface BirthdayFormProps {
  onSubmit: (date: Date) => void;
  isLoading?: boolean;
  error?: string | null;
  initialDate?: Date | null;
}

export const BirthdayForm: React.FC<BirthdayFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  initialDate,
}) => {
  const [dateValue, setDateValue] = useState(
    initialDate ? formatDateForInput(initialDate) : ''
  );
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!dateValue) {
      setLocalError('Please enter your birth date');
      return;
    }

    const date = parseDateFromInput(dateValue);
    if (!date) {
      setLocalError('Please enter a valid date');
      return;
    }

    const now = new Date();
    if (date > now) {
      setLocalError('Birth date cannot be in the future');
      return;
    }

    const minDate = new Date(1900, 0, 1);
    if (date < minDate) {
      setLocalError('Birth date cannot be before 1900');
      return;
    }

    onSubmit(date);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
    setLocalError(null);
  };

  const displayError = error || localError;

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <FormTitle>When were you born?</FormTitle>
      <FormSubtitle>
        Enter your birth date to discover the incredible statistics of your life journey
      </FormSubtitle>

      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel htmlFor="birthdate">Birth Date</InputLabel>
          <InputWrapper>
            <InputIcon>
              <Calendar size={20} />
            </InputIcon>
            <DateInput
              id="birthdate"
              type="date"
              value={dateValue}
              onChange={handleDateChange}
              max={formatDateForInput(new Date())}
              min="1900-01-01"
              required
              whileFocus={{ scale: 1.02 }}
              aria-describedby={displayError ? 'date-error' : undefined}
            />
          </InputWrapper>
          
          {displayError && (
            <ErrorMessage
              id="date-error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              role="alert"
            >
              <AlertCircle size={16} />
              {displayError}
            </ErrorMessage>
          )}
        </InputGroup>

        <SubmitButton
          type="submit"
          disabled={isLoading || !dateValue}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Calculating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Show My Life Stats
            </>
          )}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};