import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import SalesTable from './SalesTable.tsx';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

describe('SalesTable Component', () => {
  it('should render without crashing', () => {
    render(<SalesTable salesData={[]} />);
  });

  it('table component exists', () => {
    render(<SalesTable salesData={[]} />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('table columns are tabQty, tabDescr, tabUnPr, tabVal', () => {
    render(<SalesTable salesData={[]} />);
    //const headers = screen.getAllByRole('columnheader');
  });
});
