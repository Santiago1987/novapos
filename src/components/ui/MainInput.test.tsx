import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainInput from './MainInput.tsx';
import '@testing-library/jest-dom';

describe('MainInput Component', () => {
  it('redenders without crashing', () => {
    render(<MainInput />);
  });

  it('rednders with a label', () => {
    render(<MainInput textLabel="pepito" />);

    const labelElement = screen.getByText('pepito');
    expect(labelElement).toBeInTheDocument();

    expect(labelElement).toHaveTextContent('pepito');
  });
});
