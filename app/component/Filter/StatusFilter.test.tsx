import { describe, expect, it } from 'vitest';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  renderHook,
  waitFor,
} from '@testing-library/react';
import useStatusFilter from './StatusFilter';
import { afterEach, beforeEach } from 'node:test';

const FilterComponent = () => {
  const { Filter } = useStatusFilter();
  return <Filter />;
};

describe('useStatusFilter', () => {
  const { result } = renderHook(() => useStatusFilter());
  const Component = result.current.Filter;
  render(<Component />);
  it('renders the select dropdown with the correct default value', async () => {
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.value).toBe('DONE,IN_PROGRESS');
  });

  it('renders the correct number of options', () => {
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
  });

  it('changes the select dropdown value updates the state accordingly', async () => {
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    await waitFor(() => {
      fireEvent.change(selectElement, { target: { value: 'DONE' } });

      const filteringStatus = result.current.filteringStatus;
      expect(filteringStatus).toEqual(['DONE']);
    });
  });
});