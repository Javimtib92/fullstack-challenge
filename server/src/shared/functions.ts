import logger from './Logger'

export const pErr = (err: Error): void => {
  if (err) {
    logger.err(err)
  }
}
