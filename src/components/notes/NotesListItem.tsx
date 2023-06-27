import { notesListItem } from "../../types/list";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface NotesListItemProps {
  notesListItem: notesListItem;
}

export const NotesListItem: React.FC<NotesListItemProps> = ({
  notesListItem,
}) => {
  // Return a list item with the text of the note and the created at date and time in hours and minutes
  return (
    <ListItem divider>
      <ListItemText
        primary={
          notesListItem.text == ""
            ? "This note is empty, did you mean to add something here?"
            : notesListItem.text
        }
      />
    </ListItem>
  );
};
