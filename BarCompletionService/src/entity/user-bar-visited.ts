import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserBarVisited {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  barId: number;
}
