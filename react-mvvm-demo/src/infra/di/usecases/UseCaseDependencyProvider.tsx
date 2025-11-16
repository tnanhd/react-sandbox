import { createContext, useMemo } from "react";
import { useRepositoryModule } from "../../../data/module";
import { useUseCaseModule, type UseCaseModule } from ".";

export const UseCaseDependencyContext = createContext<UseCaseModule | null>(
  null
);

export const UseCaseDependencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dependencies: UseCaseModule = useMemo(() => {
    const repositories = useRepositoryModule();
    return useUseCaseModule(repositories);
  }, []);

  return (
    <UseCaseDependencyContext.Provider value={dependencies}>
      {children}
    </UseCaseDependencyContext.Provider>
  );
};
