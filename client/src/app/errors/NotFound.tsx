import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography variant="h3">
        Oops - we could not found what you are looking for
      </Typography>
      <Button component={Link} to="/catalog">
        Back to Store
      </Button>
    </Container>
  );
}
