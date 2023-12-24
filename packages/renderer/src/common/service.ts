import type { EntityManager } from "typeorm"

export type ServiceRemoveOption = {
  typeorm?: Parameters<EntityManager["remove"]>["2"]
}