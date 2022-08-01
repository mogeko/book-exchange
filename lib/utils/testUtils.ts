import { render, renderHook } from "@testing-library/react";
import type { RenderOptions, RenderHookOptions } from "@testing-library/react";
import { WrapProvider } from "@/pages/_app";

function renderWithProvider(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: WrapProvider, ...options });
}

function renderHookWithProvider<Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>
) {
  return renderHook(render, { wrapper: WrapProvider, ...options });
}

export * from "@testing-library/react";
export { renderHookWithProvider as renderHook };
export { renderWithProvider as render };
