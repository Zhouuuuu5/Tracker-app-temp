import React from "react";
import { useRef, useEffect } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";

interface TooltipProps {
  visible: boolean;
  position: { x: number; y: number };
  content: string;
  style?: StyleProp<ViewStyle>;
}

const Tooltip: React.FC<TooltipProps> = ({
  visible,
  position,
  content,
  style,
}) => {
  const { x, y } = position;
  const tooltipRef = useRef<View>(null);

  useEffect(() => {
    if (visible && tooltipRef.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      tooltipRef.current.style.left = `${x - width / 2}px`;
      tooltipRef.current.style.top = `${y - height - 10}px`;
    }
  }, [visible, x, y]);

  return visible ? (
    <View
      ref={tooltipRef}
      style={[
        {
          position: "absolute",
          textAlign: "center",
          minWidth: 80,
          minHeight: 28,
          padding: 8,
          fontSize: 12,
          backgroundColor: "lightgray",
          borderWidth: 0,
          borderRadius: 8,
          pointerEvents: "none",
        },
        style,
      ]}
    >
      <Text style={{ margin: 8 }}>{content}</Text>
    </View>
  ) : null;
};

export default Tooltip;
