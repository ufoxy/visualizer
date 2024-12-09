import formatPatternDate from "../utils/formatPatternDate";
import useGetModel from "./getModel";

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

function useGetEarningCalculatorById(
  id: any,
  equipmentModel: any,
  equipmentStateHistory: any,
  equipment: any,
  period: Period
) {
  const filterEquipment = equipmentStateHistory.filter(
    (e: any) => e.equipmentId === id
  );

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
      const allDates = filterEquipment
        .flatMap((e: any) => e.states.map((state: any) => new Date(state.date)))
        .sort((a: Date, b: Date) => a.getTime() - b.getTime());
      startDate = allDates[0] || new Date(0);
      break;
  }

  const filterEquipmentHistory = filterEquipment
    .filter((e: any) => e.states)
    .map((e: any) =>
      e.states.filter((state: any) => {
        const stateDate = new Date(state.date);
        return stateDate >= startDate && stateDate <= currentDate;
      })
    );

  const hourlyEarnings = useGetModel(id, equipment, equipmentModel).map(
    (e: any) => e.hourlyEarnings
  );

  const stateOperating = hourlyEarnings.map((e: any) => e[0]);
  const stateStopped = hourlyEarnings.map((e: any) => e[1]);
  const stateMaintenance = hourlyEarnings.map((e: any) => e[2]);

  const calculateEarnings = (state: any, history: any) => {
    if (!state) {
      return 0;
    }
    const value = Number(state.value) || 0;
    const qtyStates = history.reduce((acc: number, e: any) => {
      return (
        acc +
        e.filter((s: any) => s.equipmentStateId === state.equipmentStateId)
          .length
      );
    }, 0);
    return value * qtyStates;
  };

  const earnings =
    calculateEarnings(stateOperating[0], filterEquipmentHistory) +
    calculateEarnings(stateStopped[0], filterEquipmentHistory) +
    calculateEarnings(stateMaintenance[0], filterEquipmentHistory);

  return earnings;
}

export default useGetEarningCalculatorById;
