import { IPathRequest } from '@interfaces'
import GameManager from '@services/GameManager'
import { PARAM_MISSING_ERROR } from '@shared/constants'
import { Response, Router } from 'express'
import StatusCodes from 'http-status-codes'

const router = Router()
const { BAD_REQUEST, OK } = StatusCodes

/******************************************************************************
 *                       Add One - "POST /api/game"
 ******************************************************************************/

router.post('/', async (req: IPathRequest, res: Response) => {
  const { path } = req.body
  if (!path || !path.movements) {
    return res.status(BAD_REQUEST).json({
      error: PARAM_MISSING_ERROR,
    })
  }
  const outcome = await GameManager.traverseMap(path)

  return res.status(OK).json({ message: outcome })
})

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router
