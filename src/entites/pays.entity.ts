import { Field, ObjectType } from "type-graphql";
 import { Column } from "typeorm";
 import { Entity, PrimaryGeneratedColumn } from "typeorm";
 import { Length,IsNotEmpty } from "class-validator";

 @ObjectType()
 @Entity()
 export class Pays{
    @PrimaryGeneratedColumn("increment")
    @Field()
    @IsNotEmpty()
    id: number;

    @Column()
    @Field()
    @IsNotEmpty()
    @Length(2,100)
    name: string

    @Column()
    @Field()
    @IsNotEmpty()
    @Length(2,100)
    code: string 

    @Column()
    @Field()
    @IsNotEmpty()
    @Length(2,100)
    flag: string 
 }