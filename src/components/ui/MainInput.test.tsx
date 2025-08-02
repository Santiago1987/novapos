import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MainInput from './MainInput.tsx';

describe('MainInput Component', () => {
  it('redenders without crashing', () => {
    render(<MainInput />);
  });

  it('rednders with a label', () => {
    render(<MainInput textLabel="pepito" />);
    const labelElement = document.querySelector('label');
    expect(labelElement).toBeDefined();
    console.log('aaaaaa', labelElement);
    expect(labelElement?.textContent).toContain('pepito');
  });
});
