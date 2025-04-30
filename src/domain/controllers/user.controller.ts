import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import UserUsecase from "src/application/usecases/user/user.case";
import { UserRegisterDto, UserUpdateDto, UserUpdatePasswordDto } from "src/infrastructure/dto/user.dto";

@Controller(`user`)
export default class UserController {

    constructor(
        private userCase: UserUsecase,
    ) {}

    @Post(`create`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async create(@Body() body: UserRegisterDto) {
        return await this.userCase.createNewUser({ data:body });
    }

    @Put(`update/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async update(@Body() body: UserUpdateDto, @Param() param: { id:string }) {
        return await this.userCase.updateUser({ data:body,id:param.id });
    }

    @Put(`update/password/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async updatePassword(@Body() body: UserUpdatePasswordDto, @Param() param: { id:string }) {
        return await this.userCase.updateUserPassword({ data:body,id:param.id });
    }

    @Delete(`delete/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async delete(@Param() param: { id:string }) {
        return await this.userCase.deleteUser({ id:param.id });
    }

    @Get(`find/:id`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async find(@Param() param: { id:string }) {
        return await this.userCase.findUser({ id:param.id });
    }

    @Get(`paginate`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async paginate(@Query() query: { skip:string, take:string, param?:string }) {
        return await this.userCase.paginateUser({
            skip: query.skip ? Number(query.skip) : 0,
            take: query.take ? Number(query.take) : 10,
            param: query.param ? query.param : ``
        });
    }
}
