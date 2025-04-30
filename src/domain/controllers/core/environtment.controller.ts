import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import EnvirontmenUsecase from "src/application/usecases/core/environtment.case";
import EnvirontmentDto from "src/infrastructure/dto/core/environment.dto";

@Controller(`environtment`)
export default class EnvirontmentController {
    constructor(
            private useCase: EnvirontmenUsecase,
        ) { }
    
        @Post(`create`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async create(@Body() body: EnvirontmentDto) {
            return await this.useCase.createNewEnvirontment({ data: body });
        }
    
        @Put(`update/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async update(@Body() body: EnvirontmentDto, @Param() param: { id: string }) {
            return await this.useCase.updateEnvirontment({ data: body, id: param.id });
        }
    
        @Delete(`delete/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async delete(@Param() param: { id: string }) {
            return await this.useCase.deleteEnvirontment({ id: param.id });
        }
    
        @Get(`find/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async find(@Param() param: { id: string }) {
            return await this.useCase.findEnvirontment({ id: param.id });
        }
    
        @Get(`paginate`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async paginate(@Query() query: { skip: string, take: string, param?: string }) {
            return await this.useCase.paginateEnvirontment({
                skip: query.skip ? Number(query.skip) : 0,
                take: query.take ? Number(query.take) : 10,
                param: query.param ? query.param : ``
            });
        }
}
