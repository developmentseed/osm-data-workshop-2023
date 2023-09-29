import { useState, useEffect, useContext, useRef } from "react";
import { Paper } from "@mui/material";
import Map, { Source, Layer, NavigationControl, Popup } from "react-map-gl";
import { CustomBox } from "./ComponentUtils";
import * as contants from "../utils/constants";
import { AppContext, SET_CENTER } from "../context/AppContext";

const layerStyle = {
  id: "3d-buildings",
  source: "my-data",
  type: "fill-extrusion",
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      contants.minZoom - 0.5,
      ["*", ["get", "height"], 0.5],
      contants.maxZoom,
      ["get", "height"],
    ],
    "fill-extrusion-base": 0,
    "fill-extrusion-opacity": 0.8,
  },
};

const MapPaper = () => {
  const { state, dispatch } = useContext(AppContext);
  const { data, center } = state;

  const mapRef = useRef(null);
  const [initialViewport, setInitialViewport] = useState({
    longitude: -74.2252009,
    latitude: -13.1587593,
    zoom: 12,
    pitch: 0,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    if (center && mapRef) {
      mapRef.current?.flyTo({
        center: [center.longitude, center.latitude],
        zoom: 16,
        duration: 400,
      });
      dispatch({ type: SET_CENTER, payload: null });
    }
  }, [center]);

  const handleViewportChange = (e) => {
    const { viewState } = e;
    if (!viewState) return;

    if (viewState.zoom <= contants.minZoom) {
      setPitch(0);
    } else if (viewState.zoom >= contants.maxZoom) {
      setPitch(contants.maxPitch);
    } else {
      const ratio =
        (viewState.zoom - contants.minZoom) /
        (contants.maxZoom - contants.minZoom);
      setPitch(ratio * contants.maxPitch);
    }
    setInitialViewport({ ...viewState });
  };

  const handleMapHover = (event) => {
    try {
      const features = mapRef.current.queryRenderedFeatures(event.point);
      const featuresFilter = features.filter((i) => i.source === "my-data");
      if (featuresFilter.length > 0) {
        setPopupInfo({
          ...featuresFilter[0],
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
        });
      } else {
        setPopupInfo(null);
      }
    } catch (error) {
      setPopupInfo(null);
      console.error(error);
    }
  };

  return (
    <Paper elevation={2}>
      <CustomBox>
        <Map
          ref={mapRef}
          mapboxAccessToken={contants.API_TOKEN}
          pitch={pitch}
          maxZoom={contants.maxZoom + 2}
          initialViewState={{ ...initialViewport }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          onZoom={handleViewportChange}
          onMouseMove={handleMapHover}
        >
          {data && (
            <Source id="my-data" type="geojson" data={data}>
              <Layer {...layerStyle} />
            </Source>
          )}
          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              offset={[0, -10]}
              closeButton={false}
            >
              <div>
                {Object.entries(popupInfo.properties).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </Popup>
          )}
          <NavigationControl style={{ top: 10, left: 10 }} />
        </Map>
      </CustomBox>
    </Paper>
  );
};

export default MapPaper;
