import useGetModel from "./getModel";

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

function useGetProductivityPercentageById(
  id: any,
  equipment: any,
  equipmentModel: any,
  equipmentStateHistory: any,
  period: Period
) {
  let totalOperating = 0;

  const currentDate = new Date("2021-02-28T00:00:00.000Z");

  let startDate: Date;
  switch (period) {
    case "24hrs":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 1);
      break;
    case "7d":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 7);
      break;
    case "30d":
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "1y":
      startDate = new Date(currentDate);
      startDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case "all":
    default:
      const allDates = equipmentStateHistory
        .flatMap((e: any) => e.states.map((state: any) => new Date(state.date)))
        .sort((a: Date, b: Date) => a.getTime() - b.getTime());
      startDate = allDates[0] || new Date(0);
      break;
  }

  const filterEquipment = equipmentStateHistory.filter(
    (e: any) => e.equipmentId === id
  );

  const filteredStates = filterEquipment.map((e: any) =>
    e.states.filter(
      (state: any) => new Date(state.date).getTime() >= startDate.getTime()
    )
  );

  const hourlyEarnings = useGetModel(id, equipment, equipmentModel).map(
    (e: any) => e.hourlyEarnings
  );
  const stateOperating = hourlyEarnings
    .map((e: any) => e[0])
    .map((e: any) => e);

  const equipmentStateId = stateOperating
    .map((e: any) => e.equipmentStateId)
    .join("");

  filteredStates.forEach((states: any) =>
    states.forEach((state: any) => {
      if (state.equipmentStateId === equipmentStateId) {
        totalOperating++;
      }
    })
  );

  let totalHours: number;
  if (period === "all") {
    const totalMillis = currentDate.getTime() - startDate.getTime();
    totalHours = totalMillis / (1000 * 60 * 60);
  } else {
    switch (period) {
      case "24hrs":
        totalHours = 24;
        break;
      case "7d":
        totalHours = 7 * 24; // 7 dias
        break;
      case "30d":
        totalHours = 30 * 24; // 30 dias
        break;
      case "1y":
        totalHours = 365 * 24; // 1 ano (não considerando anos bissextos)
        break;
      default:
        totalHours = totalOperating;
        break;
    }
  }

  const productivityPercentage = totalHours
    ? String(parseFloat(((totalOperating / totalHours) * 100).toFixed(2)))
    : "0.00";

  return productivityPercentage;
}

export default useGetProductivityPercentageById;
