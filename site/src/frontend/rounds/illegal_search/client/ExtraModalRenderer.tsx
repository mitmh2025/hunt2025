import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Modal } from "../types";

type ExtraModalRenderer = (modals: Modal[]) => ReactNode;

type ExtraModalRendererContextValue = {
  renderer: ExtraModalRenderer;
  setRenderer: (renderer: ExtraModalRenderer) => void;
};

export const noopExtraModalRendererContextValue: ExtraModalRendererContextValue =
  {
    renderer: () => null,
    setRenderer: () => {
      // noop
    },
  };

export const ExtraModalRendererContext =
  createContext<ExtraModalRendererContextValue>(
    noopExtraModalRendererContextValue,
  );

export function useRenderModalExtras(modals: Modal[]) {
  const ctx = useContext(ExtraModalRendererContext);

  return ctx.renderer(modals);
}

export function useExtraModalRenderer(renderer: ExtraModalRenderer) {
  const ctx = useContext(ExtraModalRendererContext);

  useEffect(() => {
    if (ctx.renderer !== renderer) {
      ctx.setRenderer(renderer);
    }
  }, [renderer, ctx]);
}

export function ExtraModalRendererProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [rendererFn, setRendererFn] = useState<{ fn: ExtraModalRenderer }>({
    // we have to store the state wrapped in an object because if we pass
    // the function directly to useState, it will try to call it as an
    // initializer function
    fn: noopExtraModalRendererContextValue.renderer,
  });

  const ctxValue = useMemo(
    () => ({
      renderer: rendererFn.fn,
      setRenderer: (fn: ExtraModalRenderer) => {
        setRendererFn({ fn });
      },
    }),
    [rendererFn.fn],
  );

  return (
    <ExtraModalRendererContext.Provider value={ctxValue}>
      {children}
    </ExtraModalRendererContext.Provider>
  );
}
