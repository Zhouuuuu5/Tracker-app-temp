import * as React from 'react';
import { Divider, List } from 'react-native-paper';
import { useAppDispatch } from '../../hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoreParamList } from '../../types';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';


interface Props {
  navigation: StackNavigationProp<MoreParamList, 'MoreScreen'>;
}

const More = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <List.Item title='Language Setting' titleStyle={styles.listTitle}/>
      <Divider />
      <List.Item title='App Tour' titleStyle={styles.listTitle}/>
      <Divider />
      <List.Item
        title='About the App'
        onPress={() => navigation.navigate('AboutScreen')}
        titleStyle={styles.listTitle}/>
      <Divider />
      <List.Item title="Contact Us" onPress={() => navigation.navigate('ContactUsScreen')}titleStyle={styles.listTitle}/>
      <Divider />
      <List.Item title="Help and Legal" onPress={() => navigation.navigate('HelpAndLegalScreen')}titleStyle={styles.listTitle}/>
    </>
  );
};

const styles = StyleSheet.create({
  listTitle:{
    color: Colors.dark.title
  }
})

export default More;
