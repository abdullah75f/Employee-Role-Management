// create-position.dto.ts

export class CreatePositionDto {
  name: string;
  description: string;
  parentId: string; // ID of the managing position/role
}