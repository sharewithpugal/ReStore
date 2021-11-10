import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "./../../app/api/agent";
import { useState } from "react";
export default function AboutPage() {
  const [validationError, setValidationError] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("Should not see this"))
      .catch((er) => setValidationError(er));
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purpose
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((er) => console.log(er))
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((er) => console.log(er))
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((er) => console.log(er))
          }
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((er) => console.log(er))
          }
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation
        </Button>
      </ButtonGroup>
      {validationError.length > 0 && (
        <Alert severity="error">
          <AlertTitle></AlertTitle>
          <List>
            {validationError.map((er) => (
              <ListItem key={er}>
                <ListItemText>{er}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
