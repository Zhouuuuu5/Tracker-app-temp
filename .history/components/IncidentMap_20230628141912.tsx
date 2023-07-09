import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Line, Path, Svg } from "react-native-svg";
import { Text } from "./Themed";
import * as d3 from "d3";
import { geoAlbersUsa, geoPath } from "d3";
import tinycolor from "tinycolor2";
import Colors from "../constants/Colors";

interface GeoData {
  features: any[];
}

interface IncidentMapProps {
  data: GeoData;
}

const IncidentMap: React.FC<IncidentMapProps> = ({ data }) => {
  const svgRef = useRef<any>(null);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const minWH = screenWidth > screenHeight ? screenHeight / 2 : screenWidth / 2;
  const width = minWH;
  const height = minWH;

  const colorScale = d3
    .scaleThreshold<number, string>()
    .domain([0, 1, 2, 5, 10])
    .range(["#313131", "#706C00", "#A9A403", "#D7CF00", "#FFF500"]);

  const [uState, setUState] = useState<GeoData>({ features: [] });

  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const projection = geoAlbersUsa()
    .scale(1000)
    .translate([width, height])
    .fitSize([width, height], {
      type: "FeatureCollection",
      features: data.features,
    });

  const path = geoPath().projection(projection);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const mockUrl = "https://api.jsonbin.io/v3/b/63f53344ebd26539d082ca62";
        const response = await fetch(mockUrl);
        const json = await response.json();
        return json.record;
      } catch (error) {
        throw error;
      }
    };

    const fetchGeoData = async (): Promise<GeoData | undefined> => {
      try {
        const geoUrl =
          "https://gist.githubusercontent.com/JoyVivian/53b03177dda52ee9ddf4f4d12fb0dbe8/raw/ee4f380bcc12330aa0a1fb94540001898ca0152e/us-states.json";
        const response = await d3.json<GeoData | null>(geoUrl);

        return response ?? undefined;
      } catch (error) {
        throw error;
      }
    };

    const fetchData = async () => {
      try {
        const [mockData, geoData] = await Promise.all([
          fetchMockData(),
          fetchGeoData(),
        ]);

        if (geoData) {
          const mergedData = geoData.features.map(
            (feature: { properties: { name: any } }) => {
              const name = feature.properties.name;
              const mockRecord = mockData.find(
                (record: { state: any }) => record.state === name
              );
              return { ...feature, ...mockRecord };
            }
          );

          setUState({ ...(geoData as GeoData), features: mergedData });
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [data]);

  const { features: mapFeatures } = uState as GeoData;

  return (
    <View>
      <Text style={styles.title}>Map</Text>

      <Svg
        style={styles.container}
        ref={svgRef}
        width={minWH * 1.5}
        height={minWH * 1.5}
      >
        {mapFeatures &&
          mapFeatures.map((d, i) => {
            const crimes = d.crime;
            const fillColor = crimes ? colorScale(crimes) : "#313131";
            const fill =
              selectedPath === d.properties.name
                ? tinycolor(fillColor).darken(15).toString()
                : fillColor;

            return (
              <Path
                key={i}
                d={path(d)!}
                strokeWidth={selectedPath === d.properties.name ? "3" : "1"}
                stroke="white"
                fill={fill}
              />
            );
          })}
      </Svg>
    </View>
  );
};
export default IncidentMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 19,
  },
});
