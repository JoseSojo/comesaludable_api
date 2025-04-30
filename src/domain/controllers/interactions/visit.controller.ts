import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import VisitUsecase from "src/application/usecases/interactions/visit.usecase";
import VisitDto from "src/infrastructure/dto/visit.dto";

@Controller(`visit`)
export default class VisitController {
    constructor(
            private useCase: VisitUsecase,
        ) { }
    
        @Post(`create`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async create(@Body() body: VisitDto) {
            // return await this.useCase.createNewVisit({ data: body });
        }
    
        @Delete(`delete/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async delete(@Param() param: { id: string }) {
            return await this.useCase.deleteVisit({ id: param.id });
        }
    
        @Get(`find/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async find(@Param() param: { id: string }) {
            return await this.useCase.findVisit({ id: param.id });
        }
    
        @Get(`paginate`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async paginate(@Query() query: { skip: string, take: string, param?: string }) {
            return await this.useCase.paginateVisit({
                skip: query.skip ? Number(query.skip) : 0,
                take: query.take ? Number(query.take) : 10,
                param: query.param ? query.param : ``
            });
        }
}
