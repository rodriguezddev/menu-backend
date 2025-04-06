// src/description/description.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('descriptions')
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;
}
