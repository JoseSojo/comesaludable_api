import { Injectable } from "@nestjs/common";
import UserEntity from "src/infrastructure/entity/user.entity";

type typeEvent = `CREATE` | `UPDATE` | `DELETE` | `RECOVERY`;

@Injectable()
export default class VisitTemplate {

    constructor(
        private entity: UserEntity
    ) {}

    public event ({ body,type }:{type: typeEvent, body:any}) {
        if(type === "CREATE") return { event:this.entity.CREATE_INTERACTION_VISIT, body }
        else if(type === "UPDATE") return { event:this.entity.UPDATE_INTERACTION_VISIT, body }
        else if(type === "DELETE") return { event:this.entity.DELETE_INTERACTION_VISIT, body }
        else if(type === "RECOVERY") return { event:this.entity.RECOVERY_INTERACTION_VISIT, body }
    }

}
