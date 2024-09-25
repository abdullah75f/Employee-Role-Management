// create-position.dto.ts

export class CreateRoleDto {
  name: string;
  description: string;
  parentId: string; // ID of the managing position/role
}