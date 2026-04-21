import { render, screen } from '@testing-library/react';
import ProgressTracker from './ProgressTracker';

describe('ProgressTracker', () => {
  it('renders the correct progress value', () => {
    render(<ProgressTracker stepsCompleted={2} totalSteps={4} />);
    const progressText = screen.getByText('2 / 4 Steps Completed');
    expect(progressText).toBeInTheDocument();
  });
});
