import DependencyInjectionContainer from "@/dependency-injection";

export const useDependencyInjection = () => {
  const diContainer = DependencyInjectionContainer.instance;

  return {
    diContainer,
  }
};
