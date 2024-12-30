import { useMemo } from "react";

type EquipmentStateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

type EquipmentModel = {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
};

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

function useGetEarningsByPeriod(
  id: any,
  equipmentModel: EquipmentModel[],
  equipmentStateHistory: EquipmentStateHistory[],
  period: Period
): number[] {
  const fixedDate = new Date(2021, 1, 28, 22);

  const earningsArray = useMemo(() => {
    let startDate: Date;
    let endDate: Date;

    switch (period) {
      case "24hrs":
        startDate = new Date(fixedDate);
        startDate.setHours(fixedDate.getHours() - 24);
        endDate = fixedDate;
        break;
      case "7d":
        startDate = new Date(fixedDate);
        startDate.setDate(fixedDate.getDate() - 7);
        endDate = fixedDate;
        break;
      case "30d":
        startDate = new Date(fixedDate);
        startDate.setDate(fixedDate.getDate() - 30);
        endDate = fixedDate;
        break;
      case "1y":
        startDate = new Date(fixedDate);
        startDate.setFullYear(fixedDate.getFullYear() - 1);
        endDate = fixedDate;
        break;
      case "all":
      default:
        startDate = new Date(0);
        endDate = fixedDate;
        break;
    }

    const filteredData = equipmentStateHistory.find(
      (e) => e.equipmentId === id
    );

    if (!filteredData) {
      switch (period) {
        case "24hrs":
          return Array(24).fill(0);
        case "7d":
          return Array(7).fill(0);
        case "30d":
          return Array(30).fill(0);
        case "1y":
          return Array(12).fill(0);
        case "all":
        default:
          return [0];
      }
    }

    const earnings: number[] = [];

    switch (period) {
      case "24hrs":
        for (let i = 0; i < 24; i++) {
          const hourDate = new Date(fixedDate);
          hourDate.setHours(fixedDate.getHours() - i);
          const earningsValue = filteredData.states
            .filter((s) => {
              const recordDate = new Date(s.date);
              return (
                recordDate.getHours() === hourDate.getHours() &&
                recordDate.getDate() === hourDate.getDate() &&
                recordDate.getMonth() === hourDate.getMonth() &&
                recordDate.getFullYear() === hourDate.getFullYear()
              );
            })
            .reduce((acc, s) => {
              const state = equipmentModel
                .flatMap((e) => e.hourlyEarnings)
                .find(
                  (earning) => earning.equipmentStateId === s.equipmentStateId
                );
              return acc + (state ? state.value : 0);
            }, 0);
          earnings.unshift(earningsValue);
        }
        break;

      case "7d":
        for (let i = 0; i < 7; i++) {
          const dayDate = new Date(fixedDate);
          dayDate.setDate(fixedDate.getDate() - i);
          const earningsValue = filteredData.states
            .filter(
              (s) => new Date(s.date).toDateString() === dayDate.toDateString()
            )
            .reduce((acc, s) => {
              const state = equipmentModel
                .flatMap((e) => e.hourlyEarnings)
                .find(
                  (earning) => earning.equipmentStateId === s.equipmentStateId
                );
              return acc + (state ? state.value : 0);
            }, 0);
          earnings.unshift(earningsValue);
        }
        break;

      case "30d":
        for (let i = 0; i < 30; i++) {
          const dayDate = new Date(fixedDate);
          dayDate.setDate(fixedDate.getDate() - i);
          const earningsValue = filteredData.states
            .filter(
              (s) => new Date(s.date).toDateString() === dayDate.toDateString()
            )
            .reduce((acc, s) => {
              const state = equipmentModel
                .flatMap((e) => e.hourlyEarnings)
                .find(
                  (earning) => earning.equipmentStateId === s.equipmentStateId
                );
              return acc + (state ? state.value : 0);
            }, 0);
          earnings.unshift(earningsValue);
        }
        break;

      case "1y":
        for (let i = 0; i < 12; i++) {
          const monthDate = new Date(fixedDate);
          monthDate.setMonth(fixedDate.getMonth() - i);
          const earningsValue = filteredData.states
            .filter((s) => {
              const recordDate = new Date(s.date);
              return (
                recordDate.getMonth() === monthDate.getMonth() &&
                recordDate.getFullYear() === monthDate.getFullYear()
              );
            })
            .reduce((acc, s) => {
              const state = equipmentModel
                .flatMap((e) => e.hourlyEarnings)
                .find(
                  (earning) => earning.equipmentStateId === s.equipmentStateId
                );
              return acc + (state ? state.value : 0);
            }, 0);
          earnings.unshift(earningsValue);
        }
        break;

      case "all":
        const totalEarnings = filteredData.states.reduce((acc, s) => {
          const state = equipmentModel
            .flatMap((e) => e.hourlyEarnings)
            .find((earning) => earning.equipmentStateId === s.equipmentStateId);
          return acc + (state ? state.value : 0);
        }, 0);
        earnings.push(totalEarnings);
        break;
    }

    return earnings.length === 0 ? Array(earnings.length).fill(0) : earnings;
  }, [id, equipmentStateHistory, equipmentModel, period, fixedDate]);

  return earningsArray.length === 1
    ? [0, 0, 0, ...earningsArray]
    : earningsArray;
}

export default useGetEarningsByPeriod;
