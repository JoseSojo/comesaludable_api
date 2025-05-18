import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/services/prisma.service';
import PhotoEntity from './infrastructure/entity/photo.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import FilesEntity from './infrastructure/entity/core/files.entity';
import LocationEntity from './infrastructure/entity/location.entity';
import MenusEntity from './infrastructure/entity/menus.entity';
import RestaurantEntity from './infrastructure/entity/restaurant.entity';
import UserEntity from './infrastructure/entity/user.entity';
import CategoryEntity from './infrastructure/entity/core/category.entity';
import TypeEntity from './infrastructure/entity/core/type.entity';
import FilesRepository from './infrastructure/repositories/core/files.repository';
import CategoryRepository from './infrastructure/repositories/core/category.repository';
import TypeRepository from './infrastructure/repositories/core/type.repository';
import LocationRepository from './infrastructure/repositories/location.repository';
import MenusRepository from './infrastructure/repositories/menus.repository';
import PhotoRepository from './infrastructure/repositories/photo.repository';
import RestaurantRepository from './infrastructure/repositories/restaurant.repository';
import UserRepository from './infrastructure/repositories/user.repository';
import MenuController from './domain/controllers/menu.controller';
import PhotoController from './domain/controllers/photo.controller';
import RestaurantController from './domain/controllers/restaurant.controller';
import UserController from './domain/controllers/user.controller';
import CommentController from './domain/controllers/interactions/comment.controller';
import VisitController from './domain/controllers/interactions/visit.controller';
import CategoryController from './domain/controllers/core/category.controller';
import TypeController from './domain/controllers/core/type.controller';
import AnalyticEntity from './infrastructure/entity/interactions/analytic.entity';
import CommentEntity from './infrastructure/entity/interactions/comment.entity';
import VisitEntity from './infrastructure/entity/interactions/visit.entity';
import AnalyticRepository from './infrastructure/repositories/interactions/analytic.repository';
import CommentRepository from './infrastructure/repositories/interactions/comment.repository';
import VisitRepository from './infrastructure/repositories/interactions/visit.repository';
import FakeController from './domain/controllers/faker/faker.controller';
import CategoryFaker from './application/faker/core/category.faker';
import MenuFaker from './application/faker/menu.faker';
import RestaurantFaker from './application/faker/restaurant.faker';
import TypeFaker from './application/faker/core/type.faker';
import UserFaker from './application/faker/user.faker';
import VisitFaker from './application/faker/interactions/visit.faker';
import CommentFaker from './application/faker/interactions/comment';
import AnalyticFaker from './application/faker/interactions/analytic.faker';
import CategoryUsecase from './application/usecases/core/category.case';
import MenuUsecase from './application/usecases/restaurant/menu/menu.case';
import RestaurantUsecase from './application/usecases/restaurant/restaurant.case';
import TypeUsecase from './application/usecases/core/type.case';
import UserUsecase from './application/usecases/user/user.case';
import VisitUsecase from './application/usecases/interactions/visit.usecase';
import CommentUsecase from './application/usecases/interactions/comment.usecase';
import AnalyticUsecase from './application/usecases/interactions/analytic.usecase';
import TaskScheduling from './application/scheduling/task.scheduling';
import IndexLogging from './application/usecases/user/logging/index.logging';
import LoggingController from './domain/controllers/logging/logging.controller';
import HttpError from './domain/config/error/http.error';
import { JwtService } from '@nestjs/jwt';
import EnvironmentRepository from './infrastructure/repositories/core/environment.repository';
import EnvironmentEntity from './infrastructure/entity/core/environtment.entity';
import EnvironmentFaker from './application/faker/core/environment.faker';
import UserTemplate from './domain/config/templates/user.template';
import MenuTemplate from './domain/config/templates/menu.template';
import RestaurantTemplate from './domain/config/templates/restaurant.template';
import VisitTemplate from './domain/config/templates/interactions/visit.template';
import CommnetTemplate from './domain/config/templates/interactions/comment.template';
import AnalyticTemplate from './domain/config/templates/interactions/analitic.template';
import FilePhotoTemplate from './domain/config/templates/photo.template';
import FileTemplate from './domain/config/templates/core/file.template';
import TypeTemplate from './domain/config/templates/core/type.template';
import CategoryTemplate from './domain/config/templates/core/category.template';
import EnvirontmentTemplate from './domain/config/templates/core/environment.template';
import EnvirontmentController from './domain/controllers/core/environtment.controller';
import EnvirontmenUsecase from './application/usecases/core/environtment.case';
import LocationFaker from './application/faker/location.faker';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthGuard } from './domain/config/guards/AuthGuard';
import DashboardController from './domain/controllers/dashboard.controller';
import SelectedUsecase from './application/usecases/selected.case';
import SelectedController from './domain/controllers/selected.controller';
import { HttpLoggerMiddleware } from './domain/config/logger';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    
  ],
  controllers: [
    MenuController,
    PhotoController,
    RestaurantController,
    UserController,
    CommentController,
    VisitController,
    CategoryController,
    TypeController,
    EnvirontmentController,
    FakeController,       // # # FAKER
    LoggingController,    // # # LOGGING
    DashboardController,
    SelectedController,
  ],
  providers: [
    /**
     * # # # # # # # # # # # # # #
     * #     INFRAESTRUCTURE     #
     * # # # # # # # # # # # # # #
    */
    // # # # # # SERVICES # # # # #
    PrismaService,
    JwtService,
    // # # # # # REPOSITORIES # # # # #
    FilesRepository,    // CORE
    CategoryRepository, // CORE
    TypeRepository,     // CORE
    AnalyticRepository, // INTERACTION  
    CommentRepository,  // INTERACTION
    VisitRepository,    // INTERACTION
    LocationRepository,
    MenusRepository,
    PhotoRepository,
    RestaurantRepository,
    UserRepository,
    EnvironmentRepository,
    // # # # # # ENTITY # # # # #
    FilesEntity,    // CORE
    CategoryEntity, // CORE
    TypeEntity,     // CORE
    AnalyticEntity, // INTERACTION  
    CommentEntity,  // INTERACTION
    VisitEntity,    // INTERACTION 
    LocationEntity,
    MenusEntity,
    PhotoEntity,
    RestaurantEntity,
    UserEntity,
    EnvironmentEntity,

    /**
     * # # # # # # # # # # # #
     * #     APPLICATION     #
     * # # # # # # # # # # # #
    */
    // # # # # # FAKER # # # # #
    CategoryFaker,
    MenuFaker,
    RestaurantFaker,
    TypeFaker,
    UserFaker,
    VisitFaker,         // INTERACTION
    CommentFaker,       // INTERACTION
    AnalyticFaker,      // INTERACTION
    EnvironmentFaker,   // CORE
    LocationFaker,

    // # # # # # USECASES # # # # #
    CategoryUsecase,    // CORE
    TypeUsecase,        // CORE
    EnvirontmenUsecase,        // CORE
    MenuUsecase,
    RestaurantUsecase,
    UserUsecase,
    VisitUsecase,       // INTERACTION
    CommentUsecase,     // INTERACTION
    AnalyticUsecase,    // INTERACTION
    SelectedUsecase,
    // # # # # # SCHEDULING # # # # #
    TaskScheduling,    // SCHEDULING
    // # # # # # LOGGING # # # # #
    IndexLogging,    // SCHEDULING

    /**
     * # # # # # # # # # # # #
     * #        DOMAIN       #
     * # # # # # # # # # # # #
    */

    // # # # # # GUARDS # # # # #
    AuthGuard,
    // # # # # # TEMPLATES # # # # #
    UserTemplate,
    MenuTemplate,
    RestaurantTemplate,
    VisitTemplate,
    CommnetTemplate,
    AnalyticTemplate,
    FilePhotoTemplate,
    FileTemplate,
    TypeTemplate,
    CategoryTemplate,
    EnvirontmentTemplate,
    // # # # # # CONFIG # # # # #
    HttpError
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes('*'); // Aplica a todas las rutas
  }
}
