const data = require("./data/equipmentModel.json") as Data;

import type { NextApiRequest, NextApiResponse } from "next";

type Data = [
  {
    id: string;
    name: string;
    hourlyEarnings: Array<{
      equipmentStateId: string;
      value: number;
    }>;
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
