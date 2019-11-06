import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
  } from 'typeorm';

  import Item from './item';
  
  @Entity()
  export default class Category {
    
    @PrimaryGeneratedColumn()
    id
  
    @Column({ type: 'varchar' })
    title

    @ManyToMany( () => Item, (item) => item.category, {eager: true})
    item

  }
  