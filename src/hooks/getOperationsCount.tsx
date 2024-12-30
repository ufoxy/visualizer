import { useMemo } from "react";

type EquipmentStateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

type EquipmentState = {
  id: string;
  name: string;
  color: string;
};

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

type OperationCounts = {
  productiveOperations: number;
  idleOperations: number;
  maintenanceOperations: number;
};

function useGetOperationCounts(
  id: any,
  equipmentStates: EquipmentState[],
  equipmentStateHistory: EquipmentStateHistory[],
  period: Period
): OperationCounts {
  const fixedDate = new Date(2021, 1, 28, 22);

  const calculateOperationCounts = () => {
    const filteredData = equipmentStateHistory.find(
      (e) => e.equipmentId === id
    );

    if (!filteredData) {
      return {
        productiveOperations: 0,
        idleOperations: 0,
        maintenanceOperations: 0,
      };
    }

    let productiveOperations = 0;
    let idleOperations = 0;
    let maintenanceOperations = 0;

    let startDate: Date;
    switch (period) {
      case "24hrs":
        startDate = new Date(fixedDate);
        startDate.setHours(fixedDate.getHours() - 24);
        break;
      case "7d":
        startDate = new Date(fixedDate);
        startDate.setDate(fixedDate.getDate() - 7);
        break;
      case "30d":
        startDate = new Date(fixedDate);
        startDate.setDate(fixedDate.getDate() - 30);
        break;
      case "1y":
        startDate = new Date(fixedDate);
        startDate.setFullYear(fixedDate.getFullYear() - 1);
        break;
      case "all":
      default:
        startDate = new Date(0); // Começo do tempo
        break;
    }

    filteredData.states.forEach((state) => {
      const recordDate = new Date(state.date);
      if (recordDate >= startDate && recordDate <= fixedDate) {
        const equipmentState = equipmentStates.find(
          (s) => s.id === state.equipmentStateId
        );

        if (equipmentState) {
          switch (equipmentState.name) {
            case "Operando":
              productiveOperations++;
              break;
            case "Parado":
              idleOperations++;
              break;
            case "Manutenção":
              maintenanceOperations++;
              break;
            default:
              break;
          }
        }
      }
    });

    return {
      productiveOperations,
      idleOperations,
      maintenanceOperations,
    };
  };

  const operationCounts = useMemo(
    () => calculateOperationCounts(),
    [id, equipmentStateHistory, equipmentStates, period]
  );

  return operationCounts;
}

export default useGetOperationCounts;
