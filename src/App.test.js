import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Has a fifth bin', () => {
  const app = render(<App />);
  const runButton = screen.getByText('Run');
  fireEvent.click(runButton);

  const fifthBin = app.container.querySelector("#box-1-4")
  expect(fifthBin).toBeInTheDocument();
});
