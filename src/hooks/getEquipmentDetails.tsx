import { useMemo } from "react";

type EquipmentDetail = {
  id: string;
  name: string;
  description: {
    function: string;
    applications: string[];
  };
  technicalSpecifications: {
    capacity: string;
    dimensions: string;
    fuelConsumption: string;
    operationSpeed: string;
  };
  operationRequirements: {
    idealConditions: string;
    operatorSkill: string;
    compatibility: string;
  };
  maintenance: {
    recommendedTasks: string[];
    wearParts: string[];
  };
  performanceData: {
    productivity: string;
    efficiency: string;
    operationalCost: string;
  };
  safety: {
    requiredEquipment: string[];
    associatedRisks: string;
    regulations: string;
  };
  economicData: {
    lifespan: string;
    marketValue: string;
    roi: string;
  };
  useCases: {
    examples: string[];
    customerFeedback: string[];
  };
  support: {
    technicalAssistance: string;
    contact: string;
  };
};

function useGetEquipmentDetails(
  id: string,
  equipmentDetails: EquipmentDetail[],
  equipmentModel: string
) {
  const details = useMemo(() => {
    if (id && equipmentDetails) {
      return equipmentDetails.find(
        (detail) =>
          detail.name.toLocaleLowerCase() ===
          String(equipmentModel).toLocaleLowerCase()
      );
    }
    return null;
  }, [id, equipmentDetails]);

  return details;
}

export default useGetEquipmentDetails;
