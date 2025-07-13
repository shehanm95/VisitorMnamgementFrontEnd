import { DutyState } from "./DutyState"
import { ServicePoint } from "./ServicePoint"
import { UserDto } from "./user"

export interface Duty {
    id: number,
    servicePoint: ServicePoint,
    officer: UserDto,
    dutyState: DutyState,
    AcceptedTime: string
}