import { differenceInSeconds } from "date-fns";
import { useEffect, useReducer, useState } from "react";
import {
  addNewCycleAction,
  interruptCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../../reducers/cycles/actions";
import { cyclesReducer } from "../../reducers/cycles/reducer";
import { CreateNewCycle, Cycle } from "../CycleContext";

export function CyclesHooks() {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );
      return storedStateAsJSON ? JSON.parse(storedStateAsJSON) : null;

    //   if (storedStateAsJSON) {
    //     return JSON.parse(storedStateAsJSON);
    //   }
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((c) => c.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateNewCycle) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interruptCycleAction());
  }

  return {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    setSecondsPassed,
    markCurrentCycleAsFinished,
    createNewCycle,
    interruptCycle,
  };
}
