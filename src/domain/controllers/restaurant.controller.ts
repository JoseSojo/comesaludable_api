import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import RestaurantUsecase from "src/application/usecases/restaurant/restaurant.case";
import RestaurantDto from "src/infrastructure/dto/restaurant.dto";

@Controller(`restaurant`)
export default class RestaurantController {

    constructor(
        private useCase: RestaurantUsecase,
    ) { }

    @Post(`create`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async create(@Body() body: RestaurantDto) {
        return await this.useCase.createNewRestaurant({ data: body });
    }

    @Put(`update/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async update(@Body() body: RestaurantDto, @Param() param: { id: string }) {
        return await this.useCase.updateRestaurant({ data: body, id: param.id });
    }

    @Delete(`delete/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async delete(@Param() param: { id: string }) {
        return await this.useCase.deleteRestaurant({ id: param.id });
    }

    @Get(`find/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async find(@Param() param: { id: string }) {
        return await this.useCase.findRestaurant({ id: param.id });
    }

    @Get(`paginate`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async paginate(@Query() query: { skip: string, take: string, param?: string }) {
        return await this.useCase.paginateRestaurant({
            skip: query.skip ? Number(query.skip) : 0,
            take: query.take ? Number(query.take) : 10,
            param: query.param ? query.param : ``
        });
    }
}
