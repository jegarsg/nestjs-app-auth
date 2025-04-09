import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ name: 'user_name', nullable: true, unique: true })
  user_name: string;

  @Column({ name: 'full_name', nullable: true })
  full_name: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'email', nullable: true,unique: true })
  email: string;


  @Column({ name: 'phone', nullable: true,unique: true})
  phone: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'timestamptz', nullable: true })
  modified_at: Date;

  @Column({ nullable: true })
  modified_by: string;

  @Column({ default: false })
  is_deleted: boolean;
}