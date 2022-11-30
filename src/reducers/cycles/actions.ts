import { Cycle } from "../../contexts/CycleContext";

export enum ActionType {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionType.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interruptCycleAction() {
  return { type: ActionType.INTERRUPT_CURRENT_CYCLE };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionType.MARK_CURRENT_CYCLE_AS_FINISHED,
  };
}
