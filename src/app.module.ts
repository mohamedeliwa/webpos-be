import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { CatalogueModule } from './catalogue/catalogue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthenticationModule,
    CatalogueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
