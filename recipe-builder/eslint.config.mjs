import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ['.next/', 'node_modules/', 'out/', 'dist/', 'build/'],
  },
  {
    rules: {
      // New in eslint-config-next 16; existing components predate these rules
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
];

export default eslintConfig;
