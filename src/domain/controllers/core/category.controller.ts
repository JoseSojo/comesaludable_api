import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import CategoryUsecase from "src/application/usecases/core/category.case";
import CategoryDto from "src/infrastructure/dto/core/category.dto";

@Controller(`category`)
export default class CategoryController {
    constructor(
            private useCase: CategoryUsecase,
        ) { }
    
        @Post(`create`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async create(@Body() body: CategoryDto) {
            return await this.useCase.createNewCategory({ data: body });
        }
    
        @Put(`update/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async update(@Body() body: CategoryDto, @Param() param: { id: string }) {
            return await this.useCase.updateCategory({ data: body, id: param.id });
        }
    
        @Delete(`delete/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async delete(@Param() param: { id: string }) {
            return await this.useCase.deleteCategory({ id: param.id });
        }
    
        @Get(`find/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async find(@Param() param: { id: string }) {
            return await this.useCase.findCategory({ id: param.id });
        }
    
        @Get(`paginate`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async paginate(@Query() query: { skip: string, take: string, param?: string }) {
            return await this.useCase.paginateCategory({
                skip: query.skip ? Number(query.skip) : 0,
                take: query.take ? Number(query.take) : 10,
                param: query.param ? query.param : ``
            });
        }
}
