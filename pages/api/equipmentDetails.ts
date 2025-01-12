const data = require("./data/equipmentDetails.json") as Data;

import type { NextApiRequest, NextApiResponse } from "next";

type Data = [
  {
    id: string;
    name: string;
    description: { function: string; applications: string[] };
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
    maintenance: { recommendedTasks: string[]; wearParts: string[] };
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
    economicData: { lifespan: string; marketValue: string; roi: string };
    useCases: { examples: string[]; customerFeedback: string[] };
    support: { technicalAssistance: string; contact: string };
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
