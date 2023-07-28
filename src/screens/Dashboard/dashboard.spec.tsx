import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse"

import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@__tests__/utils/customRender";
import { mockCityAPIResponse } from "@__tests__/mocks/api/mockCityApiResponse";

import { Dashboard } from "@screens/Dashboard";

import { api } from "@services/api"
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";

describe('Screen: Dashboard', () => {
  beforeAll(async () => { // executar antes dos testes
    const city = {
      id: '1',
      name: 'Caucaia, BR',
      latitude: 123,
      longitude: 456,
    }

    await saveStorageCity(city);
  })

  it('should be show city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(({ data: mockWeatherAPIResponse }));

    render(<Dashboard />);

    const cityName = await waitFor(() => screen.findByText(/caucaia/i));
    expect(cityName).toBeTruthy();
  })

  it('should be show another selected weather city.', async () => {
    /*
    1 -> Buscar as informações do tempo/clima da cidade selecionada.
    2 -> Buscar as informações da cidade.
    3 -> Buscar as informações do tempo/clima da nova cidade selecionada.
    */
    jest.spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse }) // coloca o retorno da primeira chamada
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const cityName = 'São Paulo';
    await waitFor(() => act(() => {
      const search = screen.getByTestId('searchInput');
      fireEvent.changeText(search, cityName);
    }));

    await waitFor(() => act(() => {
      fireEvent.press(screen.getByText(cityName, { exact: false }))
    }))

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
  })
})