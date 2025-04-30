import { Injectable } from "@nestjs/common";
import HttpError from "src/domain/config/error/http.error";
import { UserAdministrationLoggingDto, UserLoggingDto, UserRestaurnatLoggingDto } from "src/infrastructure/dto/user.dto";
import RestaurantEntity from "src/infrastructure/entity/restaurant.entity";
import UserEntity from "src/infrastructure/entity/user.entity";
import UserRepository from "src/infrastructure/repositories/user.repository";

@Injectable()
export default class IndexLogging {
    
    constructor(
        private httpError: HttpError,
        private userEntity: UserEntity,
        private restaurantEntity: RestaurantEntity,
        private userRepository: UserRepository,
    ) {}

    public async login ({ data }:{ data:UserLoggingDto }) {
        const entity = await this.userEntity.find({ filter:{AND:[{email: data.email}]} });
    
        if(!entity) return this.httpError.handler({ message:`Verifique las credenciales.`, code:200 })

        // RETURN TO CONTROLLER
        return {...await this.generateTokenAndReturn(entity), env:`USER`, message: `Bienvenido, ${entity.name} ${entity.lastname}`}
    }

    public async administration ({ data }:{ data:UserAdministrationLoggingDto }) {

        const accessUsername = process.env.ADMIN_ACCESS_USER || `comesaludable2025`;
        const accessPassword = process.env.ADMIN_ACCESS_PASS || `abc.123`;

        if(data.username !== accessUsername || data.password !== accessPassword) {
            return this.httpError.handler({ message:`Datos de administración incorrectos`, code:401 });
        }

        // ADMINISTRATION ACCESS SUCCESS

        // VALID FOUND USER IN MONGODB
        const entity = await this.userEntity.find({ filter:{AND:[{email:accessUsername}]} });
        let admin: any = {}; 

        if(entity) { admin = entity; }
        else {
            const hash = await this.userRepository.hash(accessPassword);
            const admin = await this.userEntity.create({ 
                data:{
                    age: `20`, 
                    acceptEmail:`no`, 
                    email: accessUsername, 
                    name:`Come`,
                    lastname: `Saludable`,
                    password: hash,
                } 
            });
            console.log(admin);
        }
        
        // RETURN TO CONTROLLER
        return {...await this.generateTokenAndReturn(entity), env:`ADMIN`, message: `Bienvenido administrador`}
    }

    public async restaurant ({ data }:{ data:UserRestaurnatLoggingDto }) {
        const entity = await this.restaurantEntity.find({ filter:{ AND:[{deleteAt:null}, { access:data.code }] } });
    
        if(!entity) return this.httpError.handler({ message:`Código de acceso incorrecto.`, code:200 });

        // LOGGING RESTAURANT SUCCESS
        
        // RETURN TO CONTROLLER
        return {...await this.generateTokenAndReturn(entity), env:`RESTAURANT`, message: `Bienvenido ${entity.name}`}
    }

    private async generateTokenAndReturn(payload: any) {
        // GENERATE JWT
        const jwt = await this.userRepository.createJWT(payload);

        // RETURN TO CONTROLLER
        return { token: jwt.token, data: payload }
    }
}

