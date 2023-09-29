import { Grid, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MapPaper from "../components/Map";
const Main = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={10}>
        <Box>
          <MapPaper />
        </Box>
      </Grid>
      <Grid item md={2}>
        <Box>
          <Sidebar />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Main;
