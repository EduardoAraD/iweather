import { render, screen } from "@testing-library/react-native"
import { Day } from "@components/Day";

import clearDay from '@assets/clear_day.svg';

describe('Component: Day', () => {
  it('should be render day', () => {
    render(
      <Day
        data={{
          day: '18/07',
          icon: clearDay,
          max: '34°c',
          min: '30°c',
          weather: 'Céu limpo'
        }}
      />
    )

    expect(screen.getByText('20/07')).toBeTruthy()
  })
})