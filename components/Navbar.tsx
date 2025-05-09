import {StyleSheet, View} from "react-native";
import {BottomTabHeaderProps} from "@react-navigation/bottom-tabs";
import {Text} from 'react-native-paper';
import {useTheme} from "@/hooks/useTheme";

interface Props {
  bottomHeaderTabProps: BottomTabHeaderProps,
  headerTitle?: string,
}

export const Navbar = ({bottomHeaderTabProps, headerTitle = bottomHeaderTabProps.options.title}: Props) => {
  const {theme} = useTheme()

  return (
    <View style={[styles.container, {backgroundColor: theme.accent}]}>
      <Text variant="headlineSmall"
            style={{color: theme.foregroundSecondary}}>{headerTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    paddingHorizontal: 16,
  }
})
