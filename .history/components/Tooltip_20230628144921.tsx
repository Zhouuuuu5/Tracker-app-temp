import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";

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
  const [tooltipLayout, setTooltipLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const tooltipRef = useRef<View>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height });
  };

  useEffect(() => {
    if (visible && tooltipLayout && tooltipRef.current) {
      const { width, height } = tooltipLayout;
      tooltipRef.current.setNativeProps({
        style: {
          left: x - width / 2,
          top: y - height - 10,
        },
      });
    }
  }, [visible, x, y, tooltipLayout]);

  return visible ? (
    <View
      ref={tooltipRef}
      onLayout={handleLayout}
      style={[
        {
          position: "absolute",
          minWidth: 80,
          minHeight: 28,
          padding: 8,
          backgroundColor: "lightgray",
          borderWidth: 0,
          borderRadius: 8,
        },
        style,
      ]}
    >
      <Text style={{ textAlign: "center", margin: 8, fontSize: 12 }}>
        {content}
      </Text>
    </View>
  ) : null;
};

export default Tooltip;
