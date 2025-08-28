import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Moon, 
  Heart, 
  Wind, 
  Utensils, 
  Footprints, 
  Coffee, 
  Book, 
  Film, 
  Globe,
  LucideIcon
} from 'lucide-react';
import { StatCardData } from '../../types/stats';
import { formatNumber } from '../../utils/calculations';

const CardContainer = styled(motion.div)<{ gradient: string }>`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient};
    opacity: 0.8;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-primary-light);
    
    &::before {
      height: 6px;
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
`;

const IconContainer = styled(motion.div)<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-lg);
  background: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const CardTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
  text-align: right;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
  }
`;

const ValueContainer = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const StatValue = styled(motion.div)`
  font-size: var(--font-size-hero);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xxl);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-size-xl);
  }
`;

const StatUnit = styled.span`
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: lowercase;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
  }
`;

const FunFact = styled(motion.p)`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
  }
`;

const GlowEffect = styled(motion.div)<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, ${props => props.color}20 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
`;

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  moon: Moon,
  heart: Heart,
  wind: Wind,
  utensils: Utensils,
  footprints: Footprints,
  coffee: Coffee,
  book: Book,
  film: Film,
  globe: Globe,
};

interface StatCardProps {
  data: StatCardData;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = React.memo(({ data, index }) => {
  const IconComponent = iconMap[data.icon] || Calendar;
  const formattedValue = formatNumber(data.value);

  return (
    <CardContainer
      gradient={data.gradient}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlowEffect
        color={data.color}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
      
      <CardHeader>
        <IconContainer
          color={data.color}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: `0 8px 25px ${data.color}30`
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <IconComponent size={24} />
        </IconContainer>
        
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>

      <ValueContainer>
        <StatValue
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1 + 0.3,
            type: 'spring',
            stiffness: 100
          }}
        >
          {formattedValue}
          <StatUnit> {data.unit}</StatUnit>
        </StatValue>
      </ValueContainer>

      <FunFact
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1 + 0.5 
        }}
      >
        {data.funFact}
      </FunFact>
    </CardContainer>
  );
});

StatCard.displayName = 'StatCard';