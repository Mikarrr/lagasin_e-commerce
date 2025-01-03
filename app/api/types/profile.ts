export type EditableFields = "first_name" | "last_name" | "email" | "password";

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type UpdateMessage = Record<EditableFields, string | null>;

export type IsEditing = Record<EditableFields, boolean>;
