const data = require("./data/equipmentStateHistory.json") as Data;

import type { NextApiRequest, NextApiResponse } from "next";

type Data = [
  {
    equipmentId: string;
    states: Array<{
      date: string;
      equipmentStateId: string;
    }>;
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
