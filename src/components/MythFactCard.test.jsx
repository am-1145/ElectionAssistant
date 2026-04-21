import { render, screen } from '@testing-library/react';
import MythFactCard from './MythFactCard';

describe('MythFactCard', () => {
  it('renders myth correctly', () => {
    render(<MythFactCard statement="Voting is hard" isFact={false} explanation="It is actually quite easy." />);
    expect(screen.getByText('Voting is hard')).toBeInTheDocument();
    expect(screen.getByText('Myth')).toBeInTheDocument();
  });

  it('renders fact correctly', () => {
    render(<MythFactCard statement="You need ID to vote" isFact={true} explanation="Voter ID is required." />);
    expect(screen.getByText('You need ID to vote')).toBeInTheDocument();
    expect(screen.getByText('Fact')).toBeInTheDocument();
  });
});
