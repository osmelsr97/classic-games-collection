import { useEffect, useLayoutEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay?: number) {
  const savedCallback = useRef<() => void>(callback);
  const saveInterval = useRef<ReturnType<typeof setInterval> | undefined>();

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && saveInterval.current)
      return clearInterval(saveInterval.current);

    if (!delay) return;

    saveInterval.current = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(saveInterval.current);
  }, [delay]);
}
