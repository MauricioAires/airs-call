import type { NextApiRequest, NextApiResponse } from 'next'

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    name: 'john Doe',
  })
}
