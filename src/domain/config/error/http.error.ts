import { Injectable } from "@nestjs/common";

@Injectable()
export default class HttpError {

    constructor() {}

    public handler({ message, code, type=`error` }: { message: string, code: number, type?: string }) {
        return { message, code, type };
    }

}
