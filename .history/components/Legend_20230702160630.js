import { Svg, Rect, G, Text } from "react-native-svg";

const Legend = ({ colorScale }) => {
  const domain = colorScale.domain();

  const itemWidth = 15;
  const itemHeight = 15;

  const gap = 20;

  // Map the domain to a list of {color, label} objects
  const items = domain.map((d, i) => ({
    color: colorScale(d),
    label: i === 0 ? "0" : `${d - 1}-${d}`,
  }));
  const { width: screenWidth } = Dimensions.get("window");
  const legendWidth = width;
  const legendHeight = 200;

  return (
    <Svg
      width={legendWidth}
      height={legendHeight}
      transform={`translate(100, 0)`}
    >
      <Text
        x={legendWidth / 2}
        y={gap / 2}
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
      >
        Incident Count
      </Text>
      {items.map((item, i) => (
        <G key={i}>
          <Rect
            x="10"
            y={i * (itemWidth + gap) + 18}
            width={itemWidth}
            height={itemHeight}
            fill={item.color}
          />
          <Text
            x="50"
            y={i * (itemWidth + gap) + 30}
            textAnchor="left"
            fill="white"
          >
            {item.label}
          </Text>
        </G>
      ))}
    </Svg>
  );
};

export default Legend;
