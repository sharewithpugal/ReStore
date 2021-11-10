import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { history } from "./../../index";

export default function ServerError() {
  const history = useHistory();
  const { state } = useLocation<any>();

  return (
    <Container component={Paper}>
      {state?.er ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {state.er.title}
          </Typography>
          <Divider />
          <Typography>{state.er.detail || "Internal server error"}</Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
      <Typography variant="h5" gutterBottom>
        Server error
      </Typography>
      <Button onClick={() => history.push("/catalog")}>Back to Store</Button>
    </Container>
  );
}
