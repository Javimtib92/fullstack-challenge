import { Direction, SlotValue } from '@enums'
import { IPath } from '@interfaces'
import { RING_DESTROYED, FALLS_OUT_OF_THE_MAP, ORCS_FOUND, NOTHING_FOUND } from '@shared/constants'
import { Coordinates } from '@types'

abstract class GameManager {
  public static mordorMap: string[][] = [
    ['-', '-', '-', 'O', '-', '-', '-', '-', '-', 'O'],
    ['-', 'O', '-', '-', '-', 'O', '-', 'D', '-', '-'],
    ['-', '-', '-', '-', 'O', '-', '-', 'O', '-', '-'],
    ['-', 'O', '-', 'O', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', 'O', '-', 'O', '-', '-'],
    ['F', '-', '-', 'O', '-', '-', '-', '-', '-', 'O'],
    ['-', '-', 'O', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', 'O', '-', '-'],
    ['-', 'O', '-', '-', 'O', 'O', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', 'O', '-'],
  ]

  /**
   * Travers the map and returns the outcome of the given path
   * @param path
   */
  public static traverseMap(path: IPath): string {
    let currentPosition = this.getStartingPointCoordinates() as Coordinates

    if (!currentPosition) {
      throw new Error("Frodo wasn't found in the initial map")
    }

    const { movements } = path

    let outcome = NOTHING_FOUND

    for (let i = 0; i < movements.length; i += 1) {
      const movement = movements[i]

      currentPosition = this.getNextPosition(currentPosition, movement)

      const currentSlotValue = this.getValue(currentPosition)

      if (this.isOutOfBounds(currentPosition)) {
        outcome = FALLS_OUT_OF_THE_MAP
        break
      } else if (SlotValue.ORCS === currentSlotValue) {
        outcome = ORCS_FOUND
        break
      } else if (SlotValue.MOUNT_DOOM === currentSlotValue) {
        outcome = RING_DESTROYED
        break
      }
    }

    return outcome
  }

  /**
   * Finds Frodo's starting position in the map
   */
  public static getStartingPointCoordinates(): Coordinates {
    return this.findInMap('F') as Coordinates
  }

  /**
   * Finds the first occurance of the provided string in the map
   * @param name string
   */
  public static findInMap(name: string): Coordinates | undefined {
    // I Iterate backwards because I want x:0 - y:0 to be at the bottom left.
    for (let y = this.mordorMap.length - 1; y >= 0; y -= 1) {
      if (this.mordorMap[y].includes(name)) {
        for (let x = 0; y < this.mordorMap[y].length; x += 1) {
          if (this.mordorMap[y][x] === name) {
            return { x, y }
          }
        }
      }
    }
  }

  /**
   * Gets the value in the map of the provided position
   * @param position Coordinates
   */
  public static getValue(position: Coordinates): string {
    return this.mordorMap[Math.abs(position.y - this.mordorMap.length)][position.x]
  }

  /**
   * Gets next position on the map for the current movement
   * @param currentPosition
   * @param movement
   */
  public static getNextPosition(currentPosition: Coordinates, movement: string): Coordinates {
    let currentMoveVector: Coordinates = { x: 0, y: 0 }
    switch (movement) {
      case Direction.N:
        currentMoveVector = { x: 0, y: 1 }
        break
      case Direction.E:
        currentMoveVector = { x: 1, y: 0 }
        break
      case Direction.S:
        currentMoveVector = { x: 0, y: -1 }
        break
      case Direction.W:
        currentMoveVector = { x: -1, y: 0 }
    }
    const nextPositionCoordinates = {
      x: currentPosition.x + currentMoveVector.x,
      y: currentPosition.y + currentMoveVector.y,
    }

    return nextPositionCoordinates
  }

  /**
   * Check if given coordinates are out of the bounds of the map
   * @param position Coordinates
   */
  public static isOutOfBounds(position: Coordinates): boolean {
    return (
      position.x > this.mordorMap[0].length ||
      position.x < 0 ||
      position.y > this.mordorMap.length ||
      position.y < 0
    )
  }
}

export default GameManager
