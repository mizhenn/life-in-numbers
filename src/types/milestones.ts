export interface DevelopmentalMilestone {
  id: string;
  name: string;
  description: string;
  typicalAgeMonths: number; // Age in months when activity typically begins
  earliestAgeMonths: number; // Earliest realistic age
  latestAgeMonths: number; // Latest typical age
  culturalVariations: CulturalVariation[];
  isRequired: boolean; // Whether this milestone is necessary for the statistic
}

export interface CulturalVariation {
  region: string;
  typicalAgeMonths: number;
  prevalence: number; // 0-1, percentage of population that engages in this activity
  notes?: string;
}

export interface PersonalMilestone {
  milestoneId: string;
  personalAgeMonths?: number; // User's personal milestone age
  isActive: boolean; // Whether user engages in this activity
  customStartDate?: Date; // Specific start date if known
}

export interface LifePhase {
  name: string;
  startAgeMonths: number;
  endAgeMonths: number;
  characteristics: string[];
  typicalActivities: string[];
}

export interface CulturalProfile {
  id: string;
  name: string;
  region: string;
  milestoneAdjustments: Record<string, number>; // milestoneId -> age adjustment in months
  activityPrevalence: Record<string, number>; // milestoneId -> prevalence (0-1)
  customMilestones?: DevelopmentalMilestone[];
}

// Predefined developmental milestones based on research
export const DEVELOPMENTAL_MILESTONES: DevelopmentalMilestone[] = [
  {
    id: 'walking',
    name: 'Walking',
    description: 'Independent walking without support',
    typicalAgeMonths: 15, // 12-18 months typical range
    earliestAgeMonths: 9,
    latestAgeMonths: 24,
    culturalVariations: [
      { region: 'Global Average', typicalAgeMonths: 15, prevalence: 1.0 },
      { region: 'Northern Europe', typicalAgeMonths: 14, prevalence: 1.0 },
      { region: 'Sub-Saharan Africa', typicalAgeMonths: 13, prevalence: 1.0, notes: 'Earlier due to cultural practices' },
    ],
    isRequired: true,
  },
  {
    id: 'coffee_consumption',
    name: 'Coffee Consumption',
    description: 'Regular coffee drinking',
    typicalAgeMonths: 192, // 16 years
    earliestAgeMonths: 144, // 12 years
    latestAgeMonths: 360, // 30 years or never
    culturalVariations: [
      { region: 'Nordic Countries', typicalAgeMonths: 168, prevalence: 0.95 }, // 14 years, very high prevalence
      { region: 'United States', typicalAgeMonths: 192, prevalence: 0.85 }, // 16 years
      { region: 'Italy', typicalAgeMonths: 180, prevalence: 0.90 }, // 15 years
      { region: 'Middle East', typicalAgeMonths: 216, prevalence: 0.70 }, // 18 years
      { region: 'East Asia', typicalAgeMonths: 240, prevalence: 0.60 }, // 20 years, lower prevalence
    ],
    isRequired: false,
  },
  {
    id: 'reading',
    name: 'Independent Reading',
    description: 'Reading books independently for pleasure',
    typicalAgeMonths: 84, // 7 years
    earliestAgeMonths: 48, // 4 years
    latestAgeMonths: 120, // 10 years
    culturalVariations: [
      { region: 'Finland', typicalAgeMonths: 84, prevalence: 0.98 },
      { region: 'Global Average', typicalAgeMonths: 90, prevalence: 0.85 },
      { region: 'Developing Regions', typicalAgeMonths: 108, prevalence: 0.65 },
    ],
    isRequired: false,
  },
  {
    id: 'driving',
    name: 'Driving',
    description: 'Independent vehicle operation',
    typicalAgeMonths: 192, // 16 years (US)
    earliestAgeMonths: 168, // 14 years (some regions)
    latestAgeMonths: 216, // 18 years
    culturalVariations: [
      { region: 'United States', typicalAgeMonths: 192, prevalence: 0.90 },
      { region: 'Europe', typicalAgeMonths: 216, prevalence: 0.75 },
      { region: 'Urban Asia', typicalAgeMonths: 240, prevalence: 0.45 },
      { region: 'Rural Areas', typicalAgeMonths: 180, prevalence: 0.85 },
    ],
    isRequired: false,
  },
  {
    id: 'alcohol_consumption',
    name: 'Alcohol Consumption',
    description: 'Legal alcohol consumption',
    typicalAgeMonths: 252, // 21 years (US legal age)
    earliestAgeMonths: 216, // 18 years (most countries)
    latestAgeMonths: 360, // 30 years or never
    culturalVariations: [
      { region: 'United States', typicalAgeMonths: 252, prevalence: 0.70 },
      { region: 'Europe', typicalAgeMonths: 216, prevalence: 0.80 },
      { region: 'Middle East', typicalAgeMonths: 0, prevalence: 0.10 }, // Cultural/religious restrictions
      { region: 'East Asia', typicalAgeMonths: 240, prevalence: 0.65 },
    ],
    isRequired: false,
  },
  {
    id: 'smartphone_usage',
    name: 'Smartphone Usage',
    description: 'Regular smartphone use',
    typicalAgeMonths: 144, // 12 years
    earliestAgeMonths: 96, // 8 years
    latestAgeMonths: 180, // 15 years
    culturalVariations: [
      { region: 'Developed Countries', typicalAgeMonths: 132, prevalence: 0.95 },
      { region: 'Global Average', typicalAgeMonths: 144, prevalence: 0.85 },
      { region: 'Developing Regions', typicalAgeMonths: 168, prevalence: 0.70 },
    ],
    isRequired: false,
  },
  {
    id: 'social_media',
    name: 'Social Media Usage',
    description: 'Active social media participation',
    typicalAgeMonths: 156, // 13 years
    earliestAgeMonths: 120, // 10 years
    latestAgeMonths: 192, // 16 years
    culturalVariations: [
      { region: 'Global Average', typicalAgeMonths: 156, prevalence: 0.80 },
      { region: 'North America', typicalAgeMonths: 144, prevalence: 0.90 },
      { region: 'Europe', typicalAgeMonths: 168, prevalence: 0.85 },
      { region: 'Restricted Regions', typicalAgeMonths: 216, prevalence: 0.30 },
    ],
    isRequired: false,
  },
];

// Life phases for contextual understanding
export const LIFE_PHASES: LifePhase[] = [
  {
    name: 'Infancy',
    startAgeMonths: 0,
    endAgeMonths: 24,
    characteristics: ['Rapid physical development', 'Basic motor skills', 'Language acquisition begins'],
    typicalActivities: ['sleeping', 'feeding', 'basic_movement'],
  },
  {
    name: 'Early Childhood',
    startAgeMonths: 24,
    endAgeMonths: 72,
    characteristics: ['Walking mastery', 'Language development', 'Social play begins'],
    typicalActivities: ['walking', 'playing', 'early_learning'],
  },
  {
    name: 'School Age',
    startAgeMonths: 72,
    endAgeMonths: 144,
    characteristics: ['Formal education', 'Peer relationships', 'Skill development'],
    typicalActivities: ['reading', 'structured_learning', 'sports', 'hobbies'],
  },
  {
    name: 'Adolescence',
    startAgeMonths: 144,
    endAgeMonths: 216,
    characteristics: ['Identity formation', 'Independence seeking', 'Adult responsibilities'],
    typicalActivities: ['driving', 'part_time_work', 'social_media', 'smartphone_usage'],
  },
  {
    name: 'Young Adulthood',
    startAgeMonths: 216,
    endAgeMonths: 360,
    characteristics: ['Career establishment', 'Relationship formation', 'Full independence'],
    typicalActivities: ['coffee_consumption', 'alcohol_consumption', 'career_activities'],
  },
  {
    name: 'Adulthood',
    startAgeMonths: 360,
    endAgeMonths: 780, // 65 years
    characteristics: ['Career peak', 'Family responsibilities', 'Established routines'],
    typicalActivities: ['all_adult_activities'],
  },
  {
    name: 'Later Life',
    startAgeMonths: 780,
    endAgeMonths: 1200, // 100 years
    characteristics: ['Retirement', 'Health considerations', 'Wisdom sharing'],
    typicalActivities: ['modified_activities', 'health_focused'],
  },
];

// Cultural profiles for different regions
export const CULTURAL_PROFILES: CulturalProfile[] = [
  {
    id: 'western_developed',
    name: 'Western Developed Countries',
    region: 'North America, Western Europe, Australia',
    milestoneAdjustments: {
      coffee_consumption: -24, // Earlier coffee adoption
      driving: 0, // Standard driving age
      smartphone_usage: -12, // Earlier tech adoption
    },
    activityPrevalence: {
      coffee_consumption: 0.85,
      reading: 0.90,
      driving: 0.85,
      alcohol_consumption: 0.75,
    },
  },
  {
    id: 'nordic',
    name: 'Nordic Countries',
    region: 'Sweden, Norway, Denmark, Finland, Iceland',
    milestoneAdjustments: {
      coffee_consumption: -48, // Much earlier and higher coffee consumption
      reading: -6, // Excellent education systems
    },
    activityPrevalence: {
      coffee_consumption: 0.95,
      reading: 0.98,
      driving: 0.80,
      alcohol_consumption: 0.70,
    },
  },
  {
    id: 'east_asian',
    name: 'East Asian Countries',
    region: 'China, Japan, South Korea, Taiwan',
    milestoneAdjustments: {
      coffee_consumption: 48, // Later coffee adoption
      driving: 48, // Later driving due to urban density
      alcohol_consumption: 24, // Different cultural approach
    },
    activityPrevalence: {
      coffee_consumption: 0.60,
      reading: 0.85,
      driving: 0.45,
      alcohol_consumption: 0.65,
    },
  },
  {
    id: 'middle_eastern',
    name: 'Middle Eastern Countries',
    region: 'Various Middle Eastern countries',
    milestoneAdjustments: {
      coffee_consumption: 24, // Later but culturally significant
      alcohol_consumption: 0, // Cultural/religious considerations
    },
    activityPrevalence: {
      coffee_consumption: 0.70,
      reading: 0.75,
      driving: 0.70,
      alcohol_consumption: 0.10,
    },
  },
];

export const DEFAULT_CULTURAL_PROFILE = CULTURAL_PROFILES[0]; // Western developed as default