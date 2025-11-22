import type { StorybookConfig } from '@storybook/nextjs-vite';

// Set Storybook environment variable
process.env.STORYBOOK = 'true';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    STORYBOOK: 'true',
  }),
  viteFinal: async (config) => {
    // Ensure STORYBOOK is available in both process.env and import.meta.env
    config.define = {
      ...config.define,
      'process.env.STORYBOOK': JSON.stringify('true'),
      'import.meta.env.STORYBOOK': JSON.stringify('true'),
    };
    return config;
  },
};
export default config;
