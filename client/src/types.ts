export interface itemType {
  _id: string;
  title: string;
  description?: string;
  status: string;
}

export type CardStatusType = 'todo' | 'doing' | 'done' | string;
