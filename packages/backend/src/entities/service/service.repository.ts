import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private repository: Repository<ServiceEntity>,
  ) {}
}
