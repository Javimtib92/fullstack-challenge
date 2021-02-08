import { IPath } from '@interfaces'
import app from '@server'
import {
  FALLS_OUT_OF_THE_MAP,
  ORCS_FOUND,
  PARAM_MISSING_ERROR,
  RING_DESTROYED,
} from '@shared/constants'
import { pErr } from '@shared/functions'
import StatusCodes from 'http-status-codes'
import supertest, { SuperTest, Test } from 'supertest'

import { IReqBody, IResponse } from '../support/types'

describe('Users Routes', () => {
  const gamePath = '/api/game'

  const { BAD_REQUEST, OK } = StatusCodes
  let agent: SuperTest<Test>

  beforeAll((done) => {
    agent = supertest.agent(app)
    done()
  })

  describe(`"POST:${gamePath}"`, () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const callApi = (reqBody: IReqBody) => {
      return agent.post(gamePath).type('json').send(reqBody)
    }

    const pathData: IPath = {
      movements: ['n', 'n', 'e'],
    }

    it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
      // Call API
      callApi({ path: pathData }).end((err: Error, res: IResponse) => {
        pErr(err)
        expect(res.status).toBe(OK)
        expect(res.body.error).toBeUndefined()
        done()
      })
    })

    it(`should return a JSON object with an error message of "${PARAM_MISSING_ERROR}" and a status
            code of "${BAD_REQUEST}" if the path param was missing.`, (done) => {
      // Call API
      callApi({}).end((err: Error, res: IResponse) => {
        pErr(err)
        expect(res.status).toBe(BAD_REQUEST)
        expect(res.body.error).toBe(PARAM_MISSING_ERROR)
        done()
      })
    })

    it(`should return a JSON object with an outcome property containing the string "${FALLS_OUT_OF_THE_MAP}" and a status
            code of "${OK}" if the path goes out of map bounds.`, (done) => {
      // Call API
      callApi({
        path: { movements: ['n', 'n', 'n', 'n', 'n', 'n'] },
      }).end((err: Error, res: IResponse) => {
        pErr(err)
        expect(res.status).toBe(OK)
        expect(res.body.message).toBe(FALLS_OUT_OF_THE_MAP)
        done()
      })
    })

    it(`should return a JSON object with an outcome property containing the string "${ORCS_FOUND}" and a status
            code of "${OK}" if the player encountered an orc in his path.`, (done) => {
      // Call API
      callApi({
        path: { movements: ['e', 'n', 'n'] },
      }).end((err: Error, res: IResponse) => {
        pErr(err)
        expect(res.status).toBe(OK)
        expect(res.body.message).toBe(ORCS_FOUND)
        done()
      })
    })

    it(`should return a JSON object with an outcome property containing the string "${RING_DESTROYED}" and a status
            code of "${OK}" if the player arrived to Mount Doom.`, (done) => {
      // Call API
      callApi({
        path: { movements: ['e', 'e', 'n', 'e', 'e', 'n', 'e', 'e', 'n', 'n', 'e'] },
      }).end((err: Error, res: IResponse) => {
        pErr(err)
        expect(res.status).toBe(OK)
        expect(res.body.message).toBe(RING_DESTROYED)
        done()
      })
    })
  })
})
