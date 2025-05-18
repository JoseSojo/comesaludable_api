import { Controller, Get, Query } from "@nestjs/common";
import SelectedUsecase from "src/application/usecases/selected.case";

@Controller(`search`)
export default class SelectedController {
    constructor(
        private useCase: SelectedUsecase,
    ) { }

    @Get(`type`)
    private async type(@Query() query: { param: string }) {
        return await this.useCase.findType(query);
    }

    @Get(`environment`)
    private async environment(@Query() query: { param: string }) {
        return await this.useCase.findEnvironment(query);
    }

    @Get(`category`)
    private async category(@Query() query: { param: string }) {
        return await this.useCase.findcategory(query);
    }
}
