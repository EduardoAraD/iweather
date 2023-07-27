import { ReactElement, ReactNode } from "react";
import { RenderOptions, render } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CityProvider } from "@contexts/CityContext";

type ProviderProps = {
  children: ReactNode;
}

function Providers({ children }: ProviderProps) {
  return (
    <SafeAreaProvider>
      <CityProvider>
        {children}
      </CityProvider>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react-native';
export { customRender as render, Providers };
