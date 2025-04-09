import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@config/database.config';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthModule } from '@modules/health/health.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // <-- makes env available app-wide
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
