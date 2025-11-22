import type { Preview } from '@storybook/nextjs-vite';
import React, { useEffect } from 'react';
import '../src/app/globals.css';

// Set Storybook environment variable
if (typeof process !== 'undefined') {
  process.env.STORYBOOK = 'true';
}

const ThemeDecorator = (Story: () => React.ReactElement, context: any) => {
  const theme = context.globals.theme || 'light';

  const ThemeWrapper = () => {
    useEffect(() => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }, [theme]);

    const storyElement = Story();
    return storyElement;
  };

  return React.createElement(ThemeWrapper);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [ThemeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
