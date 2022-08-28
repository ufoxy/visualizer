const data = require("./data/equipment.json") as Data;

import type { NextApiRequest, NextApiResponse } from "next";

type Data = [
  {
    id: string;
    equipmentModelId: string;
    name: string;
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
