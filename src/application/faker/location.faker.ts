import { Injectable } from "@nestjs/common";
import LocationEntity from "src/infrastructure/entity/location.entity";
import LocationRepository from "src/infrastructure/repositories/location.repository";

@Injectable()
export default class LocationFaker {

    constructor(
        private locationEntity: LocationEntity,
        private locationRepository: LocationRepository,
    ) { }

    public async create({ count, restaurantId }: { count: number, restaurantId: string }) {
        const data = await this.getData();
        const result = [];

        for (let i = 0; i < count; i++) {
            if (!Array.isArray(data) || data.length === 0) {
                return null; // Manejo de array vacío o no válido
            }
            const randomIndex = Math.floor(Math.random() * data.length);
            
            const element = data[randomIndex];
            const entity = await this.locationEntity.create({ data:{ restaurantReference:{connect:{id:restaurantId}},location:{lat:element.lat,lng:element.lng} } })
            result.push(entity);
        }

        return result;
    }

    private async getData() {
        return [
            {
                estado: "CARACAS",
                nombre: "Plaza Bolívar de Caracas",
                lat: 10.506098,
                lng: -66.914963
            },
            {
                estado: "CARACAS",
                nombre: "Parque Nacional El Ávila (Sabas Nieves)",
                lat: 10.540373,
                lng: -66.853586
            },
            {
                estado: "CARACAS",
                nombre: "Centro Comercial Sambil",
                lat: 10.496050,
                lng: -66.853500
            },
            {
                estado: "CARACAS",
                nombre: "Hotel Humboldt (Teleférico)",
                lat: 10.541200,
                lng: -66.885800
            },
            {
                estado: "GUÁRICO",
                nombre: "Monumento al Cristo de los Morros",
                lat: 9.909722,
                lng: -67.356944
            },
            {
                estado: "GUÁRICO",
                nombre: "Balneario Los Morros",
                lat: 9.907500,
                lng: -67.363056
            },
            {
                estado: "GUÁRICO",
                nombre: "Plaza Bolívar de Calabozo",
                lat: 8.924167,
                lng: -67.429722
            },
            {
                estado: "GUÁRICO",
                nombre: "Embalse Calabozo (Represa)",
                lat: 8.850000,
                lng: -67.433333
            },
            {
                estado: "ARAGUA",
                nombre: "Parque Nacional Henri Pittier (Entrada El Limón)",
                lat: 10.366667,
                lng: -67.633333
            },
            {
                estado: "ARAGUA",
                nombre: "Jardín Botánico de Maracay",
                lat: 10.246944,
                lng: -67.595833
            },
            {
                estado: "CARABOBO",
                nombre: "Parque Fernando Peñalver (Valencia)",
                lat: 10.183333,
                lng: -67.983333
            },
            {
                estado: "CARABOBO",
                nombre: "Centro Comercial Sambil Valencia",
                lat: 10.180833,
                lng: -67.991944
            }
        ]
    }

}
