import { createContext, ReactNode } from "react";
import { CyclesHooks } from "./Hooks/CycleHooks";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export interface CreateNewCycle {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateNewCycle) => void;
  interruptCycle: () => void;
}

interface CycleProviderProps {
  children: ReactNode;
}

export const CycleContext = createContext({} as CyclesContextType);

export const CycleProvider = ({ children }: CycleProviderProps) => {
  const {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    setSecondsPassed,
    markCurrentCycleAsFinished,
    createNewCycle,
    interruptCycle,
  } = CyclesHooks();
  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        markCurrentCycleAsFinished,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
