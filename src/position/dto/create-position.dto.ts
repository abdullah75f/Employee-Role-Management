//class that defines the structure of data for creating a role
export class CreateRoleDto {
  name: string;
  description: string;
  parentId: string; // ID of the managing role
}