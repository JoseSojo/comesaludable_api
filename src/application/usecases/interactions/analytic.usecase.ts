import { Injectable } from "@nestjs/common";
import AnalyticTemplate from "src/domain/config/templates/interactions/analitic.template";
import AnalyticEntity from "src/infrastructure/entity/interactions/analytic.entity";
import AnalyticRepository from "src/infrastructure/repositories/interactions/analytic.repository";

@Injectable()
export default class AnalyticUsecase {
    
    constructor(
            private entity: AnalyticEntity,
            private repository: AnalyticRepository,
            private template: AnalyticTemplate
        ) { }
    
        

}

