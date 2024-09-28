//class that defines the structure of data for updating a role
import { IsString, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  parentId: string;
}