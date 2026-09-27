import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "varchar", default: "pending" })
  status!: string;

  @Column({ type: "date", nullable: true })
  due_date!: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "integer" })
  user_id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
