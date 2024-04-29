import {ComponentType, lazy, LazyExoticComponent} from "react";

type CreateLazyComponentReturnType<T extends ComponentType<any>> = LazyExoticComponent<T> & {
  preload: () => void;
};

export default function createLazyComponent<T extends ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>
): CreateLazyComponentReturnType<T> {
  const LazyComponent = lazy(() => importFunction());

  (LazyComponent as CreateLazyComponentReturnType<T>).preload = () => {
    importFunction();
  };

  return LazyComponent as CreateLazyComponentReturnType<T>;
}