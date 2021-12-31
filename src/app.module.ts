import { StageModule } from './stage/stage.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StepModule } from './step/step.module';
import { ContractorModule } from './contractor/contractor.module';
import { EstimateModule } from './estimate/estimate.module';

@Module({
  imports: [
    StageModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-208-145-55.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'bzihwxnslqqgqu',
      password:
        '2d07adab242476ab0ce42d2f5c011f596daa4ebddfe190e1f4e0f63eb50f84bd',
      database: 'dcsmlrgnge4d9t',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    UsersModule,
    StepModule,
    ContractorModule,
    EstimateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
