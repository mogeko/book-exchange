import * as router from "next/router";

const mock = jest.spyOn(router, "useRouter");

const useRouterMock = {
  target: router.useRouter,
  returnResult: (router: Partial<RouterType> = {}) =>
    mock.mockReturnValue(genExampleRouter(router)),
};

export const exampleData: RouterType = {
  pathname: "/",
  query: {},
  asPath: "/",
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  route: "/",
  basePath: "/",
  isLocaleDomain: false,
  reload: jest.fn(),
  isFallback: false,
  isReady: true,
  isPreview: false,
};

function genExampleRouter(router: Partial<RouterType> = {}): RouterType {
  return { ...exampleData, ...router };
}

type RouterType = ReturnType<typeof router.useRouter>;

export default useRouterMock;
