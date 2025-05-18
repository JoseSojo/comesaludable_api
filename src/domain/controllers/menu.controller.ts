import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import MenuUsecase from "src/application/usecases/restaurant/menu/menu.case";
import MenusDto from "src/infrastructure/dto/menus.dto";

@Controller(`menu`)
export default class MenuController {
    constructor(
            private useCase: MenuUsecase,
        ) { }
    
        @Post(`create`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async create(@Body() body: MenusDto) {
            console.log(body);
            return await this.useCase.createNewMenus({ data: body });
        }
    
        @Put(`update/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async update(@Body() body: MenusDto, @Param() param: { id: string }) {
            return await this.useCase.updateMenus({ data: body, id: param.id });
        }
    
        @Delete(`delete/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async delete(@Param() param: { id: string }) {
            console.log(param);
            return await this.useCase.deleteMenus({ id: param.id });
        }
    
        @Get(`find/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async find(@Param() param: { id: string }) {
            return await this.useCase.findMenus({ id: param.id });
        }
    
        @Get(`paginate`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async paginate(@Query() query: { skip: string, take: string, param?: string, categoryId?:string, typeId?:string }) {
            return await this.useCase.paginateMenus({
                skip: query.skip ? Number(query.skip) : 0,
                take: query.take ? Number(query.take) : 10,
                param: query.param ? query.param : ``,
                categoryId: query.categoryId != `undefined` ? query.categoryId : null,
                typeId: query.typeId != `undefined` ? query.typeId : null,
            });
        }
}
