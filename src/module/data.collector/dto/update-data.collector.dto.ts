import { PartialType } from '@nestjs/mapped-types';
import { CreateDataCollectorDto } from './create-data.collector.dto';

export class UpdateDataCollectorDto extends PartialType(CreateDataCollectorDto) {}
