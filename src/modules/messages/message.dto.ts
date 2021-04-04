import { MESSAGE_TYPE } from "./message.enum";

export interface MessageDto {
  key: string;
  type: MESSAGE_TYPE;
  content: string;
}

export interface ErrorDto {
  key: string;
  label: string;
}
