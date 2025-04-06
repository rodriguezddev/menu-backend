// dish.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dishes')
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @Column('varchar', { nullable: true }) // Specify the column type as varchar
  file: string | null;
}
