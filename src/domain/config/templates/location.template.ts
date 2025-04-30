import { Injectable } from "@nestjs/common";
import UserEntity from "src/infrastructure/entity/user.entity";

type typeEvent = `CREATE` | `UPDATE` | `DELETE` | `RECOVERY`;

@Injectable()
export default class LOCATIONTemplate {

    constructor(
        private entity: UserEntity
    ) {}

    public event ({ body,type }:{type: typeEvent, body:any}) {
        if(type === "CREATE") return { event:this.entity.CREATE_LOCATION, body }
        else if(type === "UPDATE") return { event:this.entity.UPDATE_LOCATION, body }
        else if(type === "DELETE") return { event:this.entity.DELETE_LOCATION, body }
        else if(type === "RECOVERY") return { event:this.entity.RECOVERY_LOCATION, body }
    }

}
