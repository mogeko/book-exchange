import * as hooks from "@/lib/hooks/useOnScreen";

const mock = jest.spyOn(hooks, "default");

const useOnScreenMock = {
  target: hooks.default,
  visiable: () => mock.mockReturnValue(true),
  not: {
    visiable: () => mock.mockReturnValue(false),
  },
};

export default useOnScreenMock;
