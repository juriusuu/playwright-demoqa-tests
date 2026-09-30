export interface CheckBoxTestData {
  url: string;
  expectedSelectedItems: string[];
  timeouts: {
    default: number;
  };
}

export const checkBoxTestData: CheckBoxTestData = {
  url: 'https://demoqa.com/checkbox',
  expectedSelectedItems: [
    'home',
    'desktop',
    'notes',
    'commands',
    'documents',
    'workspace',
    'react',
    'angular',
    'veu',
    'office',
    'public',
    'private',
    'classified',
    'general',
    'downloads',
    'wordFile',
    'excelFile',
  ],
  timeouts: {
    default: 30000,
  },
};