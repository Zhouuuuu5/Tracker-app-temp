import * as Application from 'expo-application'
import { Caption, Divider, List } from 'react-native-paper'
import React from "react";
import {
  StyleSheet,
} from "react-native";
import { aboutUsContent } from '../../../data';
import Colors from '../../../constants/Colors';

const About = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <List.Item
        title="Application Version"
        right={() => (
          <Caption style={styles.caption}>{Application.nativeApplicationVersion}</Caption>
        )}
        titleStyle={styles.listTitle} />
      <Divider />
      <List.Item
        title="Build Version"
        right={() => <Caption style={styles.caption}>{Application.nativeBuildVersion}</Caption>}
        titleStyle={styles.listTitle} />
      <Divider />
      <List.Accordion
        title="About the App"
        expanded={expanded}
        onPress={handlePress}
        titleStyle={styles.accordionTitle}
        style={styles.accordionStyle}>
        <List.Item title="" description={aboutUsContent} descriptionNumberOfLines={10} descriptionStyle={styles.accordionDescription} />
      </List.Accordion>
      <Divider />
    </>
  )
}

const styles = StyleSheet.create({
  accordionStyle: {
    backgroundColor: Colors.dark.background
  },
  accordionTitle: {
    color: Colors.dark.text,
    backgroundColor: Colors.dark.background
  },
  accordionDescription: {
    color: Colors.dark.text
  },
  listTitle: {
    color: Colors.dark.text
  },
  caption: {
    marginTop: 5,
    color: Colors.dark.text
  },
})

export default About
