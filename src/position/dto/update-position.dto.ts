import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-position.dto';

export class UpdatePositionDto extends PartialType(CreateRoleDto) {}
