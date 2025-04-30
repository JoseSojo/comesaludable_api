import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import IndexLogging from "src/application/usecases/user/logging/index.logging";
import HttpError from "src/domain/config/error/http.error";
import { UserAdministrationLoggingDto, UserLoggingDto, UserRestaurnatLoggingDto } from "src/infrastructure/dto/user.dto";
import UserRepository from "src/infrastructure/repositories/user.repository";

@Controller(`logging`)
export default class LoggingController {

    constructor(
        private httpError: HttpError,
        private useCase: IndexLogging,
        private userRepository: UserRepository
    ) {}

    @Post(`singin`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async singin (@Body() body: UserLoggingDto) {
        try {
            return await this.useCase.login({ data:body });
        } catch (error) {
            return this.httpError.handler({ message:`Error al Iniciar sesión`, code:400 });
        }
    }

    @Post(`restaurant`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async restaurant (@Body() body: UserRestaurnatLoggingDto) {
        try {
            return await this.useCase.restaurant({ data:body });
        } catch (error) {
            return this.httpError.handler({ message:`Error al Iniciar sesión`, code:400 });
        }
    }

    @Post(`administration`)
    @UsePipes(new ValidationPipe({ transform: true }))
    private async administration (@Body() body: UserAdministrationLoggingDto) {
        try {
            return await this.useCase.administration({ data:body });
        } catch (error) {
            console.log(error);
            return this.httpError.handler({ message:`Error al Iniciar sesión`, code:400 });
        }
    }
}
