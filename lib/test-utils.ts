import { render, renderHook } from "@testing-library/react";
import type { RenderOptions, RenderHookOptions } from "@testing-library/react";
import WrapProvider from "@/providers/providers";
import { SWRConfig } from "swr";
import React from "react";

function renderWithProvider(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: WrapProviderForTest, ...options });
}

function renderHookWithProvider<Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>
) {
  return renderHook(render, { wrapper: WrapProviderForTest, ...options });
}

const WrapProviderForTest: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return React.createElement(
    WrapProvider,
    null,
    React.createElement(
      SWRConfig,
      { value: { provider: () => new Map() } },
      children
    )
  );
};

export * from "@testing-library/react";
export { renderHookWithProvider as renderHook };
export { renderWithProvider as render };
