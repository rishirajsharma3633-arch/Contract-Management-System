export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  x: number;
  y: number;
  value?: string | boolean;
}

export interface Blueprint {
  id: string;
  name: string;
  fields: Field[];
  createdAt: string;
}

export type ContractStatus = 'Created' | 'Approved' | 'Sent' | 'Signed' | 'Locked' | 'Revoked';

export interface Contract {
  id: string;
  blueprintId: string;
  blueprintName: string;
  name: string;
  status: ContractStatus;
  fields: Field[];
  createdAt: string;
}

export const VALID_TRANSITIONS: Record<ContractStatus, ContractStatus[]> = {
  Created: ['Approved', 'Revoked'],
  Approved: ['Sent'],
  Sent: ['Signed', 'Revoked'],
  Signed: ['Locked'],
  Locked: [],
  Revoked: [],
};
