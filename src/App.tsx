import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { BirthdayForm } from './components/forms/BirthdayForm';
import { StatGrid } from './components/stats/StatGrid';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { useLifeStats } from './hooks/useLifeStats';
import './styles/globals.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient-background);
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: var(--spacing-xl) var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
`;

const WelcomeSection = styled(motion.section)`
  text-align: center;
  padding: var(--spacing-xxl) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) 0;
  }
`;

const WelcomeTitle = styled(motion.h1)`
  font-size: var(--font-size-hero);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xxl);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-size-xl);
  }
`;

const WelcomeSubtitle = styled(motion.p)`
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto var(--spacing-xxl);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-xl);
  }
`;

const FormSection = styled(motion.section)`
  margin-bottom: var(--spacing-xxl);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-xl);
  }
`;

const StatsSection = styled(motion.section)`
  margin-bottom: var(--spacing-xxl);
`;

const Footer = styled.footer`
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  margin: 0;
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResetButton = styled(motion.button)`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  margin-top: var(--spacing-lg);
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }
`;

function AppContent() {
  const {
    birthDate,
    statCards,
    isLoading,
    error,
    hasValidData,
    params,
    updateBirthDate,
    updateParams,
    clearData,
  } = useLifeStats();

  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleFormSubmit = (date: Date) => {
    updateBirthDate(date);
  };

  const handleReset = () => {
    clearData();
  };

  return (
    <AppContainer>
      <Header onSettingsClick={handleSettingsClick} />
      
      <MainContent>
        <AnimatePresence mode="wait">
          {!hasValidData ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <WelcomeSection>
                <WelcomeTitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Discover Your Life in Numbers
                </WelcomeTitle>
                
                <WelcomeSubtitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Transform your birthday into an engaging statistical dashboard. 
                  See how many heartbeats you've had, steps you've taken, and 
                  amazing milestones you've reached in your journey through life.
                </WelcomeSubtitle>
              </WelcomeSection>

              <FormSection
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <BirthdayForm
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                  error={error}
                  initialDate={birthDate}
                />
              </FormSection>
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <StatsSection>
                <StatGrid
                  stats={statCards}
                  isLoading={isLoading}
                />
                
                <div style={{ textAlign: 'center' }}>
                  <ResetButton
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                  >
                    Calculate for Different Date
                  </ResetButton>
                </div>
              </StatsSection>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        params={params}
        onParamsChange={updateParams}
      />

      <Footer>
        <FooterContent>
          <FooterText>
            Made with ❤️ using React, TypeScript, and Framer Motion.
            Your data stays private and is only stored locally.
          </FooterText>
        </FooterContent>
      </Footer>
    </AppContainer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
