import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import ProgressBarExercise from './ProgressBarExercise';

beforeEach(() => {  
    jest.useFakeTimers();
})

test("Progress bar ProgressBarExercise renders", async () => {
    render(<ProgressBarExercise />);
})

test("Able to start and end requests", async () => {
    render(<ProgressBarExercise />);
    
    expect(screen.getByTestId('request-button-start')).toBeEnabled();
    expect(screen.getByTestId('request-button-end')).toBeDisabled();
    fireEvent.click(screen.getByTestId('request-button-start'));

    expect(screen.getByTestId('request-button-end')).toBeEnabled();
    expect(screen.getByTestId('request-button-start')).toHaveTextContent('Loading...');
    expect(screen.getByTestId('request-button-start')).toBeDisabled();

    fireEvent.click(screen.getByTestId('request-button-end'));
    expect(screen.getByTestId('request-button-end')).toBeDisabled();
    expect(screen.getByTestId('request-button-start')).toHaveTextContent('Start Request');
})

test("Progress hangs at 90% at 15 seconds and longer", async () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('request-button-start'));
    
    jest.advanceTimersByTime(15000);

    expect(screen.getByTestId('progress-bar')).toHaveAttribute('value', '90');

    jest.advanceTimersByTime(2000);

    expect(screen.getByTestId('progress-bar')).toHaveAttribute('value', '90');
})

test("Ending the request sets progress to 100%", async () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('request-button-start'));
    jest.advanceTimersByTime(7000);
    fireEvent.click(screen.getByTestId('request-button-end'));
    expect(screen.getByTestId('progress-bar')).toHaveValue(100);
})

test("Progress slows down around breakpoints", async () => {
    render(<ProgressBarExercise />);
    fireEvent.click(screen.getByTestId('request-button-start'));

    // Default breakpoints are [30, 45, 78]
    // Breakpoints are triggered 6 percent above and below the breakpoint
    jest.advanceTimersByTime(3000);
    expect(screen.getByTestId('progress-bar')).not.toHaveClass('breakpoint-reached');
    jest.advanceTimersByTime(1100);
    expect(screen.getByTestId('progress-bar')).toHaveClass('breakpoint-reached');
    jest.advanceTimersByTime(1000);
    expect(screen.getByTestId('progress-bar')).toHaveClass('breakpoint-reached');
    jest.advanceTimersByTime(1000);
    expect(screen.getByTestId('progress-bar')).toHaveClass('breakpoint-reached');

    jest.advanceTimersByTime(4000);
    expect(screen.getByTestId('progress-bar')).not.toHaveClass('breakpoint-reached');
})

test("Breakpoints are togglable", async () => {
    render(<ProgressBarExercise />);

    fireEvent.click(screen.getByTestId('request-button-start'));
    jest.advanceTimersByTime(4100);
    expect(screen.getByTestId('progress-bar')).toHaveClass('breakpoint-reached');

    fireEvent.click(screen.getByTestId('breakpoint-toggle'));
    jest.advanceTimersByTime(200);
    expect(screen.getByTestId('progress-bar')).not.toHaveClass('breakpoint-reached');
})

afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})