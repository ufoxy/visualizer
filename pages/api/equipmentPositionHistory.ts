const data = require("./data/equipmentPositionHistory.json") as Data;

import type { NextApiRequest, NextApiResponse } from "next";

type Data = [
  {
    equipmentId: string;
    positions: Array<{
      date: string;
      lon: number;
      lat: number;
    }>;
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
