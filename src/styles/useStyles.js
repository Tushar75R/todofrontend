// src/styles/useStyles.js
import { styled } from "@mui/system";

const useStyles = {
  Container: styled("div")((theme) => ({
    marginTop: theme.spacing(4),
  })),
  Card: styled("div")((theme) => ({
    marginBottom: theme.spacing(2),
  })),
  CardContent: styled("div")((theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  })),
  CardActions: styled("div")((theme) => ({
    justifyContent: "flex-end",
  })),
  FormControl: styled("div")((theme) => ({
    margin: theme.spacing(1),
    minWidth: 120,
  })),
};

export default useStyles;
