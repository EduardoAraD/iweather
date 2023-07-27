import { render, screen, fireEvent } from "@testing-library/react-native"

import { SelectList } from "@components/SelectList";
import { CityProps } from "@services/getCityByNameService";

describe('Component: SelectList', () => {
  it('should be return city details selected', () => {
    const data: CityProps[] = [
      { id: '1', name: 'Caucaia', latitude: 123, longitude: 456 },
      { id: '2', name: 'Campo Grande', latitude: 789, longitude: 987 },
    ];
    const onPress = jest.fn();
    render(
      <SelectList
        data={data}
        onChange={() => {}}
        onPress={onPress}
      />
    );

    const selectedCity = screen.getByText(/caucaia/i);
    fireEvent.press(selectedCity);

    expect(onPress).toBeCalledTimes(1); // vezes foi chamada a função
    expect(onPress).toBeCalledWith(data[0]); // o valor que foi recebido pela função
  })

  it('not should be show options when data prop is empty', () => {
    render(
      <SelectList
        data={[]}
        onChange={() => {}}
        onPress={() => {}}
      />
    );

    const options = screen.getByTestId("options");
    
    expect(options.children).toHaveLength(0);
  })
})