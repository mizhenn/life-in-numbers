import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StatCard } from './StatCard';
import { StatCardData } from '../../types/stats';

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg) 0;
  }
  
  @media (max-width: 480px) {
    gap: var(--spacing-md);
    padding: var(--spacing-md) 0;
  }
`;

const GridHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: var(--spacing-xxl);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-xl);
  }
`;

const GridTitle = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`;

const GridSubtitle = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--color-text-muted);
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
`;

const EmptyStateSubtext = styled.p`
  font-size: var(--font-size-md);
  opacity: 0.7;
`;

const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
`;

const LoadingCard = styled(motion.div)`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);
  height: 200px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const LoadingSkeleton = styled.div<{ width?: string; height?: string }>`
  background: var(--color-border-light);
  border-radius: var(--border-radius-sm);
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin-bottom: var(--spacing-sm);
  opacity: 0.6;
`;

interface StatGridProps {
  stats: StatCardData[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export const StatGrid: React.FC<StatGridProps> = ({
  stats,
  isLoading = false,
  title = "Your Life in Numbers",
  subtitle = "Here's what your journey looks like in fascinating statistics"
}) => {
  if (isLoading) {
    return (
      <>
        <GridHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GridTitle>{title}</GridTitle>
          <GridSubtitle>Calculating your amazing life statistics...</GridSubtitle>
        </GridHeader>
        
        <LoadingGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <LoadingCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                <LoadingSkeleton width="48px" height="48px" />
                <LoadingSkeleton width="120px" height="20px" />
              </div>
              <LoadingSkeleton width="80%" height="48px" />
              <LoadingSkeleton width="100%" height="16px" />
              <LoadingSkeleton width="90%" height="16px" />
            </LoadingCard>
          ))}
        </LoadingGrid>
      </>
    );
  }

  if (stats.length === 0) {
    return (
      <EmptyState
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <EmptyStateIcon>📊</EmptyStateIcon>
        <EmptyStateText>No statistics to display</EmptyStateText>
        <EmptyStateSubtext>Enter your birth date to see your life in numbers</EmptyStateSubtext>
      </EmptyState>
    );
  }

  return (
    <>
      <GridHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GridTitle>{title}</GridTitle>
        <GridSubtitle>{subtitle}</GridSubtitle>
      </GridHeader>
      
      <GridContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            data={stat}
            index={index}
          />
        ))}
      </GridContainer>
    </>
  );
};