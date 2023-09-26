import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;
}
