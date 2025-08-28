import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderContainer = styled(motion.header)`
  background: var(--color-surface);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const LogoText = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const LogoIcon = styled(motion.div)`
  width: 32px;
  height: 32px;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const ActionButton = styled(motion.button)`
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-md);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Subtitle = styled(motion.p)`
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin: 0;
  margin-left: var(--spacing-xs);
`;

interface HeaderProps {
  onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { isDark, toggleMode } = useTheme();

  return (
    <HeaderContainer
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <HeaderContent>
        <Logo>
          <LogoIcon
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            📊
          </LogoIcon>
          <div>
            <LogoText>Life in Numbers</LogoText>
            <Subtitle
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Discover your life's amazing statistics
            </Subtitle>
          </div>
        </Logo>

        <HeaderActions>
          <ActionButton
            onClick={toggleMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ActionButton>
          
          {onSettingsClick && (
            <ActionButton
              onClick={onSettingsClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Open settings"
            >
              <Settings size={20} />
            </ActionButton>
          )}
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};