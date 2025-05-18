import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import UserUsecase from "src/application/usecases/user/user.case";
import { AuthGuard } from "../config/guards/AuthGuard";
import { CardDashboard, TablesDataDashboard } from "src/infrastructure/dto/interfaces/dashboard.interface";
import MenusEntity from "src/infrastructure/entity/menus.entity";
import RestaurantEntity from "src/infrastructure/entity/restaurant.entity";
import { Prisma } from "@prisma/client";

@Controller(`dashboard`)
export default class DashboardController {

    constructor(
        private userCase: UserUsecase,
        private menuEntity: MenusEntity,
        private restaurantEntity: RestaurantEntity,
    ) { }

    @Get(`card`)
    @UseGuards(AuthGuard)
    private async card(@Req() req: any) {
        const user = req.user;
        console.log(user);

        const cards: CardDashboard[] = [];
        const menusFilter: Prisma.MenusWhereInput[] = [];
        const restaurantFilter: Prisma.RestaurantsWhereInput[] = [];

        menusFilter.push({ deleteAt: null });
        restaurantFilter.push({ deleteAt: null });

        if (user.admin) {
            // PROMISES
            const menusPromise = this.menuEntity.count({ filter: { AND: menusFilter } });
            const restaurantPromise = this.restaurantEntity.count({ filter: { AND: restaurantFilter } });

            cards.push({ count: await menusPromise, ico: `apple`, label: `Menús`, color: `primary` });
            cards.push({ count: await restaurantPromise, ico: `apple`, label: `Restaurantes` });
        }

        if (user.access) {
            menusFilter.push({ restaurantId: user.id });

            const menusPromise = this.menuEntity.count({ filter: { AND: menusFilter } });
            cards.push({ count: await menusPromise, ico: `apple`, label: `Menús`, color: `primary` });

        }

        console.log(cards);

        return cards
    }

    @Get(`tables`)
    @UseGuards(AuthGuard)
    private async tables(@Req() req: any) {
        const user = req.user;
        const tables: TablesDataDashboard[] = [];

        if (user.admin) {
            // Recent Restaurant 
            const recentRestaurant = this.restaurantEntity.filter({ select:{ name:true, createAt:true, _count:{select:{comment: true,visit:true, menus:true}} },filter: { deleteAt: null }, skip: 0, take: 5, order: { createAt: `asc` } });

            // Restaurant More View
            const recentMoreView = this.restaurantEntity.filter({ select:{ name:true, createAt:true, _count:{select:{comment: true,visit:true, menus:true}} },filter: { deleteAt: null }, skip: 0, take: 5, order: { visit: { _count: "desc" } } });


            // Restaurant More Comment
            const recentMoreComment = this.restaurantEntity.filter({ select:{ name:true, createAt:true, _count:{select:{comment: true,visit:true, menus:true}} },filter: { deleteAt: null }, skip: 0, take: 5, order: { comment: { _count: "desc" } } });

            // Restaurant More Comment
            const topMenu = this.menuEntity.filter({ select:{ name:true, createAt:true, _count:{select:{comment: true,visit:true}} },filter: { deleteAt: null }, skip: 0, take: 5, order: { comment: { _count: "desc" }} });


            tables.push({
                label: `Últimos restaurantes`,
                body: await recentRestaurant,
                extract: [`name`, { stractBy:`createAt`,type:`date` }, `_count.menus`],
                header: [`Nombre`, `Creación`, `Menus`],
            });
            tables.push({
                label: `Restaurantes Más Vistos`,
                body: await recentMoreView,
                extract: [`name`, `_count.visit`],
                header: [`Nombre`, `Vistas`],
            });
            tables.push({
                label: `Últimos Más Comentados`,
                body: await recentMoreComment,
                extract: [`name`, `_count.comment`],
                header: [`Nombre`, `Comentaiors`],
            });
            tables.push({
                label: `Top Menús`,
                body: await topMenu,
                extract: [`name`, `_count.comment`, `_count.visit`],
                header: [`Nombre`, `Comentaiors`, `Vistas`],
            });
            console.log(await topMenu);
            // tables.push({ label: `Comentarios Recientes`, path: `/menus/?attr=top` });
            // tables.push({ label: `Últimas Vistas`, path: `/menus/?attr=top` });
        }

        if (user.access) {
            // Restaurant More View
            const recentMoreView = this.restaurantEntity.filter({ filter: { AND:[{deleteAt: null},{ id:user.id }] }, skip: 0, take: 5, order: { visit: { _count: "desc" } } });

            // Restaurant More Comment
            const recentMoreComment = this.restaurantEntity.filter({ filter: { AND:[{deleteAt: null},{ id:user.id }] }, skip: 0, take: 5, order: { comment: { _count: "desc" } } });

            // Restaurant More Comment
            const topMenu = this.menuEntity.filter({ filter: { AND:[{deleteAt: null},{ restaurantId:user.id }] }, skip: 0, take: 5, order: { comment: { _count: "desc" }} });

            tables.push({
                label: `Restaurantes Más Vistos`,
                body: await recentMoreView,
                extract: [`name`, `_count.visit`],
                header: [`Nombre`, `Vistas`],
            });
            tables.push({
                label: `Últimos Más Comentados`,
                body: await recentMoreComment,
                extract: [`name`, `_count.comment`],
                header: [`Nombre`, `Comentaiors`],
            });
            tables.push({
                label: `Top Menús`,
                body: await topMenu,
                extract: [`name`, `_count.comment`, `_count.visit`],
                header: [`Nombre`, `Comentaiors`, `Vistas`],
            });
        }

        return tables
    }

}
