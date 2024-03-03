import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hex: string;

  @Column()
  value: number;

  @Column()
  type: 'multiplier' | 'tolerance';

  @Column({ default: true })
  active: boolean;
}
