import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "./repository.master";
import UserEntity from "../entity/user.entity";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserRepository extends RepositoryMaster {

    constructor(
        private entity: UserEntity,
        private emiter: EventEmitter2,
        private jwtService: JwtService
    ) {
        super()
    }

    public async createJWT (payload: any): Promise<{ token: string }> {
        const secret = process.env.JWT_SECRET || `abc.12345`;
        const privateKey = process.env.JWT_PRIVATE_KEY || `abc.12345`;
        const tokenPromise = this.jwtService.sign(payload, { privateKey,secret });
        const token = tokenPromise;
        return { token };
    }

    public async decodeJWT (payload: any): Promise<{ token: string }> {
        const secret = process.env.JWT_SECRET || `abc.12345`;
        const privateKey = process.env.JWT_PRIVATE_KEY || `abc.12345`;
        const tokenPromise = this.jwtService.decode(payload);
        const token = tokenPromise;
        return { token };
    }

    public async hash (password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    public async compare (password: string, oldPassword: string) {
        const compare = bcrypt.compareSync(password, oldPassword);
        return compare;
    }

    public async validationEmail ({ email }: { email:string }) {
        const emailFound = await this.entity.find({ filter:{ email } });

        return emailFound ? { error: true, message: [`Correo en uso.`] } : null;
    }
    
}
