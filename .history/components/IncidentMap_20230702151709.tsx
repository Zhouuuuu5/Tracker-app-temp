import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import { Text } from "./Themed";
import * as d3 from "d3";
import { geoAlbersUsa, geoPath } from "d3";
import tinycolor from "tinycolor2";
import Tooltip from "./Tooltip";

interface GeoData {
  features: any[];
}

interface IncidentMapProps {
  data: GeoData;
}

const IncidentMap: React.FC<IncidentMapProps> = ({ data }) => {
  //const svgRef = useRef<any>(null);

  // const screenWidth = Dimensions.get("window").width;
  // const screenHeight = Dimensions.get("window").height;
  // const minWH = screenWidth > screenHeight ? screenHeight / 2 : screenWidth / 2;
  // const width = minWH;
  // const height = minWH;
  const { width: screenWidth } = Dimensions.get("window");
  const SVGHeight = 300;
  const SVGWidth = screenWidth;
  const MAP_MARGIN = 20;
  const height = SVGHeight - 2 * MAP_MARGIN;
  const width = SVGWidth - 2 * MAP_MARGIN;

  const colorScale = d3
    .scaleThreshold<number, string>()
    .domain([0, 1, 2, 5, 10])
    .range(["#313131", "#706C00", "#A9A403", "#D7CF00", "#FFF500"]);

  const [uState, setUState] = useState<GeoData>({ features: [] });
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("");

  // Record the touch position
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollOffset(offsetX);
  };

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverData, setPopoverData] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const handleBarClose = () => {
    setPopoverVisible(false);
  };
  const handleOnPress = (d: any, event: any) => {
    setSelectedPath(d.properties.name);
    setPopoverData(`${d.properties.name}\nCrime: ${d.crime || 0}`);
    let popoverX = event.nativeEvent.pageX + scrollOffset;
    const popoverY = event.nativeEvent.pageY - SVGHeight;
    setPopoverPosition({ x: popoverX, y: popoverY });
    setPopoverVisible(true);
  };

  // const handleOnPress = (d: any, event: any) => {
  //   setSelectedPath(d.properties.name);

  //   if (Platform.OS === "web") {
  //     const { pageX, pageY } = event;
  //     setTooltipPosition({ x: pageX, y: pageY });
  //   } else {
  //     const { locationX, locationY } = event.nativeEvent;
  //     setTooltipPosition({ x: locationX, y: locationY });
  //   }

  //   setTooltipVisible(true);
  //   setTooltipContent(`${d.properties.name}\nCrime: ${d.crime || 0}`);
  // };

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
      <View style={styles.container}>
        <ScrollView
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          contentContainerStyle={{ minWidth: screenWidth }}
        >
          <TouchableOpacity>
            <Svg width={SVGWidth} height={SVGHeight}>
              {mapFeatures &&
                mapFeatures.map((d, i) => {
                  const crimes = d.crime;
                  const fillColor = crimes ? colorScale(crimes) : "#313131";
                  const fill =
                    selectedPath === d.properties.name
                      ? tinycolor(fillColor).darken(15).toString()
                      : fillColor;

                  return (
                    <TouchableWithoutFeedback
                      onPressIn={(event) => handleOnPress(d, event)}
                    >
                      <Path
                        key={i}
                        d={path(d)!}
                        strokeWidth={
                          selectedPath === d.properties.name ? "3" : "1"
                        }
                        stroke="white"
                        fill={fill}
                      />
                    </TouchableWithoutFeedback>
                  );
                })}
            </Svg>
            {/* {tooltipVisible && (
              <Tooltip
                visible={tooltipVisible}
                position={tooltipPosition}
                content={tooltipContent}
                // onClose={() => setTooltipVisible(false)}
              />
            )} */}

            {popoverVisible && (
              <View
                style={[
                  styles.popoverContainer,
                  { left: popoverPosition.x, top: popoverPosition.y },
                ]}
              >
                <View style={styles.popoverContent}>
                  <Text style={styles.label}>{popoverData.label}</Text>
                  <Text style={styles.label}>
                    Total {popoverData.value} monthly case
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    marginTop: 19,
    marginBottom: 19,
  },
  popoverContainer: {
    position: "absolute",
    backgroundColor: "#283046",
    borderRadius: 8,
    borderColor: "#3b4253",
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 65,
    width: 180,
    opacity: 0.97,
  },
  popoverContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
    marginBottom: 10,
    color: Colors.dark.text,
  },
});
