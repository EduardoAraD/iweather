import { render, screen } from "@testing-library/react-native"

import { NextDays } from "@components/NextDays";

import clearDay from '@assets/clear_day.svg';

describe('Component: NextDay', () => {
  it('should be render day', () => {
    render(
      <NextDays data={[
        { day: '18/07', icon: clearDay, max: '34°c', min: '30°c', weather: 'Céu limpo'},
        { day: '19/07', icon: clearDay, max: '35°c', min: '32°c', weather: 'Céu limpo'},
        { day: '20/07', icon: clearDay, max: '32°c', min: '28°c', weather: 'Céu nublado'},
        { day: '21/07', icon: clearDay, max: '30°c', min: '27°c', weather: 'Céu limpo'},
        { day: '22/07', icon: clearDay, max: '34°c', min: '30°c', weather: 'Céu limpo'}
      ]} />
    )

    expect(screen.getByText('18/07')).toBeTruthy();
  })
})