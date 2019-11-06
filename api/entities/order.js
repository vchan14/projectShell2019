/* eslint-disable import/no-cycle */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import User from './user';
import Order_Item from './order_item';
  
  @Entity()
  export default class Order {
    @PrimaryGeneratedColumn()
    id
  
    @Column({ type: 'number' })
    total_cost
  
    @Column({ type: 'number' })
    total_weight
  
    @Column({ type: 'number' })
    order_status
  
    @Column({ type: 'number' })
    staff_id
  
    @ManyToOne(() => User, (user) => user.order, {eager: true})
    user

    @OneToMany(() => Order_Item, (order_item) => order_item.order, {eager: true})
    order_item 
 
  }
  