import { IPath } from '@interfaces'
import { Response } from 'supertest'

export interface IResponse extends Response {
  body: {
    message: string
    error: string
  }
}

export interface IReqBody {
  path?: IPath
}
