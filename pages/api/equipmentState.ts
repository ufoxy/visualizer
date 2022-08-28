const data = require("./data/equipmentState.json") as Data;

import type { NextApiRequest, NextApiResponse } from "next";

type Data = [
  {
    id: string;
    name: string;
    color: string;
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data);
}
