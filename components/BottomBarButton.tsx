import {StyleSheet, TouchableOpacity} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {BottomTabBarButtonProps} from "@react-navigation/bottom-tabs";
import {useTheme} from "@/hooks/useTheme";
import {useEffect} from "react";
import {usePathname} from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  props: BottomTabBarButtonProps;
  icon: string;
  label?: string;
}

export const BottomBarButton = ({props, icon, label = ""}: Props) => {
  const {theme} = useTheme();
  const pathname = usePathname();
  const isFocused = pathname === props.href;

  const scale = useSharedValue(isFocused ? 1.2 : 1);
  const opacity = useSharedValue(isFocused ? 1 : 0.7);

  useEffect(() => {
    scale.value = withTiming(isFocused ? 1.2 : 1, {duration: 150});
    opacity.value = withTiming(isFocused ? 1 : 0.7, {duration: 150});
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, {backgroundColor: theme.accent}]}
      onPress={props.onPress}
    >
      <Animated.View style={animatedStyle}>
        {/* @ts-ignore */}
        <FontAwesome name={icon} size={24} color={theme.foregroundSecondary}/>
      </Animated.View>
      <Animated.Text
        style={[
          styles.label,
          {color: theme.foregroundSecondary},
          animatedStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 14,
  },
});
