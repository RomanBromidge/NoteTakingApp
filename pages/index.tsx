import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NotesList } from "../src/components/notes/NotesList";
import { TextInput } from "../src/components/inputs/TextInput";
import { useMutation, gql } from "@apollo/client";

const INSERT_NOTE = gql`
  mutation InsertNoteOne($text: String!) {
    insert_notes_one(object: { text: $text }) {
      id
      text
      created_at
      updated_at
    }
  }
`;

export default function Home() {
  // Instantiate the mutation, passing the GraphQL mutation and the cache update function
  const [insertNoteMutation] = useMutation(INSERT_NOTE, {
    update(cache, { data: { insert_notes_one } }) {
      cache.modify({
        fields: {
          notes(existingNotes = []) {
            const newNoteRef = cache.writeFragment({
              data: insert_notes_one,
              fragment: gql`
                fragment NewNote on notes {
                  id
                  text
                  created_at
                  updated_at
                }
              `,
            });
            return [...existingNotes, newNoteRef];
          },
        },
      });
    },
  });

  // Function to trigger the mutation
  const createNote = async (noteText: string) => {
    try {
      const result = await insertNoteMutation({
        variables: {
          text: noteText,
        },
      });

      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "left",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Note Taking App - Omnea Technical Test
        </Typography>

        <TextInput
          label="Add a note"
          validationRegex={/^[a-zA-Z0-9!,.? -'"]{0,180}$/}
          validationFailMessage="Only letters, numbers, and standard punctuation are allowed. Max 180 characters."
          onValidatedSubmit={createNote}
          callToAction="Add Note"
        />
        <NotesList />
      </Box>
    </Container>
  );
}
