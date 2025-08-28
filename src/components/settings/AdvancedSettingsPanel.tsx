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
  RotateCcw,
  Globe,
  Calendar,
  User,
  Settings as SettingsIcon
} from 'lucide-react';
import { ConfigurableParams, DEFAULT_PARAMS } from '../../types/stats';
import { 
  PersonalMilestone, 
  CulturalProfile, 
  DEVELOPMENTAL_MILESTONES, 
  CULTURAL_PROFILES, 
  DEFAULT_CULTURAL_PROFILE 
} from '../../types/milestones';

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
  max-width: 800px;
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

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-surface);
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--color-text-secondary)'};
  border: none;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'var(--color-surface-secondary)'};
  }
`;

const Content = styled.div`
  padding: var(--spacing-xl);
`;

const Section = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const CulturalSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const CulturalCard = styled(motion.div)<{ selected: boolean }>`
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  border: 2px solid ${props => props.selected ? 'var(--color-primary)' : 'var(--color-border-light)'};
  background: ${props => props.selected ? 'var(--color-primary)15' : 'var(--color-surface-secondary)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
`;

const CulturalName = styled.h4`
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
`;

const CulturalRegion = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
`;

const MilestoneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
`;

const MilestoneCard = styled.div`
  padding: var(--spacing-lg);
  background: var(--color-surface-secondary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
`;

const MilestoneName = styled.h4`
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
`;

const MilestoneDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0 0 var(--spacing-md) 0;
`;

const MilestoneControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const AgeInput = styled.input`
  width: 80px;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
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

interface AdvancedSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  params: ConfigurableParams;
  onParamsChange: (params: ConfigurableParams) => void;
  personalMilestones: PersonalMilestone[];
  onMilestonesChange: (milestones: PersonalMilestone[]) => void;
  culturalProfile: CulturalProfile;
  onCulturalProfileChange: (profile: CulturalProfile) => void;
}

export const AdvancedSettingsPanel: React.FC<AdvancedSettingsPanelProps> = ({
  isOpen,
  onClose,
  params,
  onParamsChange,
  personalMilestones,
  onMilestonesChange,
  culturalProfile,
  onCulturalProfileChange,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'cultural' | 'milestones'>('basic');
  const [localParams, setLocalParams] = useState<ConfigurableParams>(params);
  const [localMilestones, setLocalMilestones] = useState<PersonalMilestone[]>(personalMilestones);
  const [localCulturalProfile, setLocalCulturalProfile] = useState<CulturalProfile>(culturalProfile);

  const handleSave = () => {
    onParamsChange(localParams);
    onMilestonesChange(localMilestones);
    onCulturalProfileChange(localCulturalProfile);
    onClose();
  };

  const handleReset = () => {
    setLocalParams(DEFAULT_PARAMS);
    setLocalMilestones([]);
    setLocalCulturalProfile(DEFAULT_CULTURAL_PROFILE);
  };

  const handleMilestoneChange = (milestoneId: string, ageMonths: number, isActive: boolean) => {
    setLocalMilestones(prev => {
      const existing = prev.find(m => m.milestoneId === milestoneId);
      if (existing) {
        return prev.map(m => 
          m.milestoneId === milestoneId 
            ? { ...m, personalAgeMonths: ageMonths, isActive }
            : m
        );
      } else {
        return [...prev, { milestoneId, personalAgeMonths: ageMonths, isActive }];
      }
    });
  };

  const getMilestoneValue = (milestoneId: string) => {
    const personal = localMilestones.find(m => m.milestoneId === milestoneId);
    const milestone = DEVELOPMENTAL_MILESTONES.find(m => m.id === milestoneId);
    return {
      ageMonths: personal?.personalAgeMonths || milestone?.typicalAgeMonths || 0,
      isActive: personal?.isActive ?? true,
    };
  };

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
                <Title>Advanced Life Settings</Title>
                <Subtitle>Personalize your statistics with cultural context and personal milestones</Subtitle>
              </div>
              <CloseButton
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </CloseButton>
            </Header>

            <TabContainer>
              <Tab
                active={activeTab === 'basic'}
                onClick={() => setActiveTab('basic')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SettingsIcon size={16} />
                Basic Settings
              </Tab>
              <Tab
                active={activeTab === 'cultural'}
                onClick={() => setActiveTab('cultural')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe size={16} />
                Cultural Profile
              </Tab>
              <Tab
                active={activeTab === 'milestones'}
                onClick={() => setActiveTab('milestones')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar size={16} />
                Personal Milestones
              </Tab>
            </TabContainer>

            <Content>
              {activeTab === 'basic' && (
                <Section>
                  <SectionTitle>
                    <User size={20} />
                    Basic Life Parameters
                  </SectionTitle>
                  {/* Basic settings content - reuse from original SettingsPanel */}
                  <p>Basic parameter controls would go here (sleep, heart rate, etc.)</p>
                </Section>
              )}

              {activeTab === 'cultural' && (
                <Section>
                  <SectionTitle>
                    <Globe size={20} />
                    Cultural Background
                  </SectionTitle>
                  <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                    Your cultural background affects when certain life activities typically begin and how common they are.
                  </p>
                  <CulturalSelector>
                    {CULTURAL_PROFILES.map((profile) => (
                      <CulturalCard
                        key={profile.id}
                        selected={localCulturalProfile.id === profile.id}
                        onClick={() => setLocalCulturalProfile(profile)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CulturalName>{profile.name}</CulturalName>
                        <CulturalRegion>{profile.region}</CulturalRegion>
                      </CulturalCard>
                    ))}
                  </CulturalSelector>
                </Section>
              )}

              {activeTab === 'milestones' && (
                <Section>
                  <SectionTitle>
                    <Calendar size={20} />
                    Personal Milestones
                  </SectionTitle>
                  <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                    Customize when you personally reached these life milestones for more accurate statistics.
                  </p>
                  <MilestoneGrid>
                    {DEVELOPMENTAL_MILESTONES.map((milestone) => {
                      const value = getMilestoneValue(milestone.id);
                      return (
                        <MilestoneCard key={milestone.id}>
                          <MilestoneName>{milestone.name}</MilestoneName>
                          <MilestoneDescription>{milestone.description}</MilestoneDescription>
                          <MilestoneControls>
                            <CheckboxContainer>
                              <Checkbox
                                type="checkbox"
                                checked={value.isActive}
                                onChange={(e) => handleMilestoneChange(
                                  milestone.id, 
                                  value.ageMonths, 
                                  e.target.checked
                                )}
                              />
                              Active
                            </CheckboxContainer>
                            <AgeInput
                              type="number"
                              min={milestone.earliestAgeMonths}
                              max={milestone.latestAgeMonths}
                              value={Math.floor(value.ageMonths / 12)}
                              onChange={(e) => handleMilestoneChange(
                                milestone.id, 
                                parseInt(e.target.value) * 12, 
                                value.isActive
                              )}
                              disabled={!value.isActive}
                            />
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                              years old
                            </span>
                          </MilestoneControls>
                        </MilestoneCard>
                      );
                    })}
                  </MilestoneGrid>
                </Section>
              )}
            </Content>

            <Footer>
              <Button
                variant="secondary"
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                Reset All
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