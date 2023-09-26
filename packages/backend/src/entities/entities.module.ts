import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './service/service.entity';
import { ServiceRepository } from './service/service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceRepository],
  exports: [ServiceRepository],
})
export class EntitiesModule {}
