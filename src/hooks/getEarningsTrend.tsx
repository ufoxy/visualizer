import { useMemo } from "react";
import useGetEarningsByPeriod from "./getEarningsByPeriod";

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

function useEarningsTrend(
  id: any,
  equipmentModel: any,
  equipmentStateHistory: any,
  period: Period
) {
  const currentEarnings = useGetEarningsByPeriod(
    id,
    equipmentModel,
    equipmentStateHistory,
    period
  );

  let previousPeriod: Period;
  switch (period) {
    case "24hrs":
      previousPeriod = "24hrs";
      break;
    case "7d":
      previousPeriod = "7d";
      break;
    case "30d":
      previousPeriod = "30d";
      break;
    case "1y":
      previousPeriod = "1y";
      break;
    case "all":
      previousPeriod = "all";
      break;
    default:
      previousPeriod = "all";
      break;
  }

  let previousEarnings = useGetEarningsByPeriod(
    id,
    equipmentModel,
    equipmentStateHistory,
    previousPeriod
  );

  const calculatePreviousEarnings = () => {
    let totalPreviousEarnings = 0;

    switch (period) {
      case "24hrs":
        totalPreviousEarnings = previousEarnings.slice(-2, -1)[0] || 0;
        break;
      case "7d":
        totalPreviousEarnings = previousEarnings.reduce((acc, curr) => acc + curr, 0) || 0;
        break;
      case "30d":
        totalPreviousEarnings = previousEarnings.reduce((acc, curr) => acc + curr, 0) || 0;
        break;
      case "1y":
        totalPreviousEarnings = previousEarnings.reduce((acc, curr) => acc + curr, 0) || 0;
        break;
      case "all":
        totalPreviousEarnings = previousEarnings[0] || 0; // total
        break;
      default:
        totalPreviousEarnings = 0;
        break;
    }

    return totalPreviousEarnings;
  };

  const previousTotalEarnings = calculatePreviousEarnings();

  if (currentEarnings.length > 0) {
    const currentTotalEarnings = currentEarnings.reduce((acc, curr) => acc + curr, 0);
    if (currentTotalEarnings > previousTotalEarnings) {
      return "Aumentou";
    } else if (currentTotalEarnings < previousTotalEarnings) {
      return "Diminuiu";
    } else {
      return "Manteve";
    }
  }

  return "Manteve"; // Caso não haja ganhos no período atual
}

export default useEarningsTrend;
