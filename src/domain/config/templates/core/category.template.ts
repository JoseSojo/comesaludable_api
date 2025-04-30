import { Injectable } from "@nestjs/common";
import UserEntity from "src/infrastructure/entity/user.entity";

type typeEvent = `CREATE` | `UPDATE` | `DELETE` | `RECOVERY`;

@Injectable()
export default class CategoryTemplate {

    constructor(
        private entity: UserEntity
    ) {}

    public event ({ body,type }:{type: typeEvent, body:any}) {
        if(type === "CREATE") return { event:this.entity.CREATE_CORE_CATEGORY, body }
        else if(type === "UPDATE") return { event:this.entity.UPDATE_CORE_CATEGORY, body }
        else if(type === "DELETE") return { event:this.entity.DELETE_CORE_CATEGORY, body }
        else if(type === "RECOVERY") return { event:this.entity.RECOVERY_CORE_CATEGORY, body }
    }

}
