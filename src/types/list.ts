export type notesList = {
  id: number;
  items: notesListItem[];
};

export type notesListItem = {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
};
