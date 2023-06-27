import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface TextInputProps {
  label: string;
  validationRegex: RegExp;
  validationFailMessage: string;
  onValidatedSubmit: (value: string) => void;
  callToAction: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  validationRegex,
  validationFailMessage,
  onValidatedSubmit,
  callToAction,
}) => {
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateInput = (value: string) => {
    setValue(value);
    if (value.match(validationRegex)) {
      setErrorMessage("");
    } else {
      setErrorMessage(validationFailMessage);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    validateInput(event.target.value);
  };

  const handleSubmit = () => {
    if (errorMessage === "") {
      onValidatedSubmit(value);
      setValue("");
    }
  };

  return (
    <Stack direction="row" alignItems={"start"} spacing={2} sx={{ my: 2 }}>
      <TextField
        sx={{ flexGrow: 1 }}
        id="outlined-basic"
        label={label}
        variant="standard"
        autoComplete="off"
        type="text"
        name="noteText"
        onChange={onChange}
        value={value}
        error={errorMessage !== ""}
        helperText={errorMessage}
      />
      <Button
        variant="contained"
        sx={{ mt: 1, p: 2 }}
        onClick={handleSubmit}
        disabled={errorMessage !== ""}
      >
        {callToAction}
      </Button>
    </Stack>
  );
};
