import * as React from "react";
import useGetStateById from "./getStateById";

function useGetStatusClassById(
  id: any,
  equipmentStateHistory: any,
  equipmentState: any
) {
  const stateName = useGetStateById(id, equipmentStateHistory, equipmentState)
    .map((e: any) => e.state.map((e: any) => e.name))
    .join("");
  if (stateName === "Operando") {
    return "#2ecc71";
  } else if (stateName === "Parado") {
    return "#e74c3c";
  } else if (stateName === "Manutenção") {
    return "#f1c40f";
  } else return;
}

export default useGetStatusClassById;
