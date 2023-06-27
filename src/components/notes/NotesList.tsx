import { notesListItem } from "../../types/list";
import { NotesListItem } from "./NotesListItem";
import List from "@mui/material/List";

import { useQuery, gql } from "@apollo/client";

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      text
      created_at
      updated_at
    }
  }
`;

export const NotesList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_NOTES);

  return (
    <List>
      {loading && <p>Loading...</p>}
      {data &&
        data.notes.map((notesListItem: notesListItem) => (
          <NotesListItem key={notesListItem.id} notesListItem={notesListItem} />
        ))}
    </List>
  );
};
