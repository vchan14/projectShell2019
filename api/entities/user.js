/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import Address from './address';
import Order from './order';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  firstname

  @Column({ type: 'varchar' })
  lastname

  @Column({ type: 'number' })
  permission

  @Column({ type: 'number' })
  credit_card_number

  @Column({ type: 'varchar', unique: true })
  email

  @Column({ type: 'varchar', nullable: false })
  password

  @OneToOne(() => Address, (address) => address.user, { eager: true })
  address

  @OneToMany(() => Order, (order) => order.user, { eager: true})
  order
}
