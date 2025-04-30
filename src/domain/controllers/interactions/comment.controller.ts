import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import CommentUsecase from "src/application/usecases/interactions/comment.usecase";
import CommentDto from "src/infrastructure/dto/comment.dto";

@Controller(`comment`)
export default class CommentController {
    constructor(
            private useCase: CommentUsecase,
        ) { }
    
        @Post(`create`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async create(@Body() body: CommentDto) {
            // return await this.useCase.createNewComment({ data: body });
        }
    
        @Put(`update/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async update(@Body() body: CommentDto, @Param() param: { id: string }) {
            return await this.useCase.updateComment({ data: body, id: param.id });
        }
    
        @Delete(`delete/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async delete(@Param() param: { id: string }) {
            return await this.useCase.deleteComment({ id: param.id });
        }
    
        @Get(`find/:id`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async find(@Param() param: { id: string }) {
            return await this.useCase.findComment({ id: param.id });
        }
    
        @Get(`paginate`)
        @UsePipes(new ValidationPipe({ transform: true }))
        private async paginate(@Query() query: { skip: string, take: string, param?: string }) {
            return await this.useCase.paginateComment({
                skip: query.skip ? Number(query.skip) : 0,
                take: query.take ? Number(query.take) : 10,
                param: query.param ? query.param : ``
            });
        }
}
