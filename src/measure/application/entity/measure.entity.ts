import { $Enums, Prisma } from '@prisma/client';
import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Measure implements Prisma.MeasureUncheckedCreateInput {
    @PrimaryGeneratedColumn()
    measure_uuid: UUID

    @Column()
    measure_value: number;

    @Column({type: 'datetime'})
    measure_datetime: string | Date;

    @Column()
    measure_type: $Enums.MeasureType;
    
    @Column()
    custumer_code: string; 
    
    @Column({default: false})
    has_confirmed?: boolean;

    @Column()
    image_url: string;
}