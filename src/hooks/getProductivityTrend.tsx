import useGetProductivityPercentageById from "./getProductivityPercentageById";

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

function useProductivityTrend(
  id: any,
  equipment: any,
  equipmentModel: any,
  equipmentStateHistory: any,
  period: Period
) {
  const currentDate = new Date("2021-02-28T00:00:00.000Z");
  const currentProductivity = parseFloat(
    useGetProductivityPercentageById(
      id,
      equipment,
      equipmentModel,
      equipmentStateHistory,
      period
    )
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

  let previousStartDate: Date;
  switch (period) {
    case "24hrs":
      previousStartDate = new Date(currentDate);
      previousStartDate.setDate(currentDate.getDate() - 2); // 24 horas antes do período atual
      break;
    case "7d":
      previousStartDate = new Date(currentDate);
      previousStartDate.setDate(currentDate.getDate() - 14); // 7 dias antes do período atual
      break;
    case "30d":
      previousStartDate = new Date(currentDate);
      previousStartDate.setMonth(currentDate.getMonth() - 2); // 30 dias antes do período atual
      break;
    case "1y":
      previousStartDate = new Date(currentDate);
      previousStartDate.setFullYear(currentDate.getFullYear() - 2); // 1 ano antes do período atual
      break;
    case "all":
    default:
      const allDates = equipmentStateHistory
        .flatMap((e: any) => e.states.map((state: any) => new Date(state.date)))
        .sort((a: Date, b: Date) => a.getTime() - b.getTime());
      previousStartDate = allDates[0] || new Date(0);
      break;
  }

  const previousProductivity = parseFloat(
    useGetProductivityPercentageById(
      id,
      equipment,
      equipmentModel,
      equipmentStateHistory,
      previousPeriod
    )
  );

  if (currentProductivity > previousProductivity) {
    return "Aumentou";
  } else if (currentProductivity < previousProductivity) {
    return "Diminuiu";
  } else {
    return "Manteve";
  }
}

export default useProductivityTrend;
