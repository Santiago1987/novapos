import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import MainInput from './MainInput.tsx';

describe('MainInput Component', () => {
  it('redenders without crashing', () => {
    render(<MainInput />);
  });
});
