import { PartialType } from '@nestjs/swagger';
import { CreateReytingDto } from './create-reyting.dto';

export class UpdateReytingDto extends PartialType(CreateReytingDto) {}

