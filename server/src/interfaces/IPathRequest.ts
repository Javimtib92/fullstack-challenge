import { IPath } from '@interfaces'
import { Request } from 'express'

export interface IPathRequest extends Request {
  body: {
    path: IPath
  }
}
