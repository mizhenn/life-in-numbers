import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Coffee, 
  Moon, 
  Heart, 
  Footprints, 
  Utensils, 
  Book, 
  Film, 
  Wind,
  RotateCcw
} from 'lucide-react';
import { ConfigurableParams, DEFAULT_PARAMS } from '../../types/stats';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
`;

const Panel = styled(motion.div)`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border-light);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const Header = styled.div`
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: var(--color-surface);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: var(--spacing-xs) 0 0 0;
`;

const CloseButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-md);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  cursor: pointer;

  &:hover {
    background: var(--color-error);
    color: white;
    border-color: var(--color-error);
  }
`;

const Content = styled.div`
  padding: var(--spacing-xl);
`;

const SettingGroup = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: var(--color-surface-secondary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
  margin-bottom: var(--spacing-md);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary-light);
    transform: translateY(-1px);
  }
`;

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
`;

const IconContainer = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-md);
  background: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const SettingDetails = styled.div`
  flex: 1;
`;

const SettingLabel = styled.h4`
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
`;

const SettingDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const NumberInput = styled.input`
  width: 80px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const Unit = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 500;
  min-width: 60px;
`;

const Footer = styled.div`
  padding: var(--spacing-xl);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  background: var(--color-surface);
  border-radius: 0 0 var(--border-radius-xl) var(--border-radius-xl);
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;

  ${props => props.variant === 'primary' ? `
    background: var(--gradient-primary);
    color: white;
    border: none;

    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }
  ` : `
    background: var(--color-surface-secondary);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);

    &:hover {
      background: var(--color-border-light);
    }
  `}
`;

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  params: ConfigurableParams;
  onParamsChange: (params: ConfigurableParams) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  params,
  onParamsChange,
}) => {
  const [localParams, setLocalParams] = useState<ConfigurableParams>(params);

  const handleSave = () => {
    onParamsChange(localParams);
    onClose();
  };

  const handleReset = () => {
    setLocalParams(DEFAULT_PARAMS);
  };

  const handleParamChange = (key: keyof ConfigurableParams, value: number) => {
    setLocalParams(prev => ({
      ...prev,
      [key]: Math.max(0, value), // Ensure non-negative values
    }));
  };

  const settings = [
    {
      key: 'sleepHoursPerDay' as keyof ConfigurableParams,
      label: 'Sleep Hours',
      description: 'Average hours of sleep per day',
      icon: Moon,
      color: '#5856D6',
      unit: 'hours/day',
      min: 0,
      max: 24,
    },
    {
      key: 'heartRatePerMinute' as keyof ConfigurableParams,
      label: 'Heart Rate',
      description: 'Average resting heart rate',
      icon: Heart,
      color: '#FF3B30',
      unit: 'BPM',
      min: 40,
      max: 200,
    },
    {
      key: 'breathsPerMinute' as keyof ConfigurableParams,
      label: 'Breathing Rate',
      description: 'Average breaths per minute',
      icon: Wind,
      color: '#34C759',
      unit: 'breaths/min',
      min: 8,
      max: 30,
    },
    {
      key: 'stepsPerDay' as keyof ConfigurableParams,
      label: 'Daily Steps',
      description: 'Average steps walked per day',
      icon: Footprints,
      color: '#5AC8FA',
      unit: 'steps/day',
      min: 0,
      max: 50000,
    },
    {
      key: 'cupsOfCoffeePerDay' as keyof ConfigurableParams,
      label: 'Coffee Consumption',
      description: 'Average cups of coffee per day',
      icon: Coffee,
      color: '#8E4EC6',
      unit: 'cups/day',
      min: 0,
      max: 20,
    },
    {
      key: 'mealsPerDay' as keyof ConfigurableParams,
      label: 'Daily Meals',
      description: 'Average meals consumed per day',
      icon: Utensils,
      color: '#FF9500',
      unit: 'meals/day',
      min: 1,
      max: 10,
    },
    {
      key: 'readingSpeedPagesPerHour' as keyof ConfigurableParams,
      label: 'Reading Speed',
      description: 'Pages read per hour',
      icon: Book,
      color: '#AF52DE',
      unit: 'pages/hour',
      min: 10,
      max: 200,
    },
    {
      key: 'averageBookPages' as keyof ConfigurableParams,
      label: 'Book Length',
      description: 'Average pages per book',
      icon: Book,
      color: '#AF52DE',
      unit: 'pages',
      min: 50,
      max: 1000,
    },
    {
      key: 'averageMovieMinutes' as keyof ConfigurableParams,
      label: 'Movie Length',
      description: 'Average movie duration',
      icon: Film,
      color: '#FF2D92',
      unit: 'minutes',
      min: 60,
      max: 300,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Panel
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Header>
              <div>
                <Title>Personalize Your Stats</Title>
                <Subtitle>Adjust these settings to make your life statistics more accurate</Subtitle>
              </div>
              <CloseButton
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </CloseButton>
            </Header>

            <Content>
              <SettingGroup>
                {settings.map((setting) => {
                  const IconComponent = setting.icon;
                  return (
                    <SettingItem key={setting.key}>
                      <SettingInfo>
                        <IconContainer color={setting.color}>
                          <IconComponent size={20} />
                        </IconContainer>
                        <SettingDetails>
                          <SettingLabel>{setting.label}</SettingLabel>
                          <SettingDescription>{setting.description}</SettingDescription>
                        </SettingDetails>
                      </SettingInfo>
                      <InputContainer>
                        <NumberInput
                          type="number"
                          min={setting.min}
                          max={setting.max}
                          value={localParams[setting.key]}
                          onChange={(e) => handleParamChange(setting.key, parseFloat(e.target.value) || 0)}
                        />
                        <Unit>{setting.unit}</Unit>
                      </InputContainer>
                    </SettingItem>
                  );
                })}
              </SettingGroup>
            </Content>

            <Footer>
              <Button
                variant="secondary"
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                Reset to Defaults
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </Button>
            </Footer>
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>
  );
};