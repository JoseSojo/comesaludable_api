import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import TypeUsecase from "src/application/usecases/core/type.case";
import TypeDto from "src/infrastructure/dto/core/type.dto";

@Controller(`type`)
export default class TypeController {
    constructor(
        private useCase: TypeUsecase,
    ) { }

    @Post(`create`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async create(@Body() body: TypeDto) {
        return await this.useCase.createNewType({ data: body });
    }

    @Put(`update/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async update(@Body() body: TypeDto, @Param() param: { id: string }) {
        return await this.useCase.updateType({ data: body, id: param.id });
    }

    @Delete(`delete/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async delete(@Param() param: { id: string }) {
        return await this.useCase.deleteType({ id: param.id });
    }

    @Get(`find/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async find(@Param() param: { id: string }) {
        return await this.useCase.findType({ id: param.id });
    }

    @Get(`paginate`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async paginate(@Query() query: { skip: string, take: string, param?: string }) {
        return await this.useCase.paginateType({
            skip: query.skip ? Number(query.skip) : 0,
            take: query.take ? Number(query.take) : 10,
            param: query.param ? query.param : ``
        });
    }
}
