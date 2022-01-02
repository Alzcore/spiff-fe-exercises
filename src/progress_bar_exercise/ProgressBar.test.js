import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import { Solution } from './ProgressBarExercise';

beforeEach(() => {  
    jest.useFakeTimers();
})

test("Progress bar solution renders", async () => {
    render(<Solution />);
})

test("Able to start and end requests", async () => {
    render(<Solution />);
    
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
    render(<Solution />);
    fireEvent.click(screen.getByTestId('request-button-start'));
    
    jest.advanceTimersByTime(15000);

    expect(screen.getByTestId('progress-bar')).toHaveAttribute('value', '90');

    jest.advanceTimersByTime(2000);

    expect(screen.getByTestId('progress-bar')).toHaveAttribute('value', '90');
})