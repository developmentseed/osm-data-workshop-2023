import { useContext, useState } from "react";
import { Paper, Divider, List, ListItemText } from "@mui/material";
import { CustomBoxAside } from "./ComponentUtils";
import { CustomButton, VisuallyHiddenInput } from "./ComponentUtils";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AppContext, SET_DATA, SET_CENTER } from "../context/AppContext";
import { getRandomInt } from "../utils/utils";
import { PISO_HEIGHT } from "../utils/constants";
import { center } from "@turf/turf";
import { CustomListItem } from "./ComponentUtils";

const Sidebar = () => {
  const { dispatch } = useContext(AppContext);
  const [stats, setStats] = useState(null);

  onchange = (e) => {
    const file = e.target.files[0];
    dispatch({ type: SET_DATA, payload: null });

    const validExtensions = [".geojson", ".json"];
    const fileExtension = file.name.slice(
      ((file.name.lastIndexOf(".") - 1) >>> 0) + 2,
    );
    if (!validExtensions.includes("." + fileExtension)) {
      alert("Please, upload another file.");
      return;
    }

    var reader = new FileReader();

    reader.onload = () => {
      try {
        var obj = JSON.parse(reader.result);
        var newStats = { total_: obj.features.length };
        const features = {
          ...obj,
          features: obj.features.map((i) => {
            if (!i.properties.levels) {
              i.properties.levels = getRandomInt();
            }
            i.properties.height = i.properties.levels * PISO_HEIGHT;

            Object.keys(i.properties).forEach((jk) => {
              if (!jk.includes("@id")) {
                var name = jk;
                if (jk === "amenity") {
                  name = `A:${i.properties[jk]}`;
                }
                if (!newStats[name]) {
                  newStats[name] = 0;
                }
                newStats[name]++;
              }
            });
            return { ...i };
          }),
        };

        const centroid = center(features);
        const [longitude, latitude] = centroid.geometry.coordinates;
        dispatch({ type: SET_DATA, payload: { ...features } });
        dispatch({
          type: SET_CENTER,
          payload: {
            longitude,
            latitude,
          },
        });
        setStats({ ...newStats });
      } catch (error) {
        dispatch({ type: SET_DATA, payload: null });
        alert("Incorrect file.");
      }
    };

    reader.onerror = () => {
      dispatch({ type: SET_DATA, payload: null });
      alert("Corrupted file.");
    };

    reader.readAsText(file);
  };

  return (
    <Paper elevation={2}>
      <CustomBoxAside>
        <CustomButton
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon color="secondary" />}
          href="#file-upload"
        >
          Upload
          <VisuallyHiddenInput type="file" ccept="application/JSON" />
        </CustomButton>
        <Divider />
        <List sx={{ width: "100%" }}>
          {stats &&
            Object.keys(stats).map((k) => {
              if (stats[k] === 1) return null;
              if (["id", "levels", "height", "building"].includes(k))
                return null;
              return (
                <CustomListItem
                  key={k}
                  disableGutters
                  secondaryAction={`${stats[k]}`}
                >
                  <ListItemText
                    primary={`${k}`}
                    primaryTypographyProps={{ fontSize: "0.9rem" }}
                  />
                </CustomListItem>
              );
            })}
        </List>
      </CustomBoxAside>
    </Paper>
  );
};

export default Sidebar;
