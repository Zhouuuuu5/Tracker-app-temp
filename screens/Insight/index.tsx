import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Screen from '../../components/Screen';
import { InsightParamList } from '../../types';
import { View, Text } from '../../components';
import { SegmentedButtons, DataTable } from 'react-native-paper';
import Colors from '../../constants/Colors';

interface Props {
  navigation: StackNavigationProp<InsightParamList, 'InsightScreen'>;
}

export default function Insight({ navigation }: Props) {
  const [value, setValue] = React.useState('');
  // const theme = useTheme();
  let fakeData = [];
  for (let i = 0; i < 10; i++) {
    fakeData.push(
      <DataTable.Row key={i}>
        <DataTable.Cell>
          <Text style={styles.text}>California</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={styles.text}>68</Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  }
  return (
    <Screen scroll style={styles.container}>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          style={styles.segmentedbuttons}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'incident',
              label: 'Incidents',
              uncheckedColor: '#ffffff',
              checkedColor: '#000',
              style: {
                backgroundColor:
                  value === 'incident' ? Colors.dark.tint : '#000',
              },
            },
            {
              value: 'Total pop',
              label: 'Total Pop.',
              uncheckedColor: '#ffffff',
              style: {
                backgroundColor:
                  value === 'Total pop' ? Colors.dark.tint : '#000',
              },
            },
            {
              value: 'Asian pop',
              label: 'Asian Pop.',
              uncheckedColor: '#ffffff',
              style: {
                backgroundColor:
                  value === 'Asian pop' ? Colors.dark.tint : '#000',
              },
            },
          ]}
        />
      </SafeAreaView>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection='descending'>
              <Text style={styles.title}>State</Text>
            </DataTable.Title>
            <DataTable.Title numeric sortDirection='descending'>
              <Text style={styles.title}>Count</Text>
            </DataTable.Title>
          </DataTable.Header>
          {fakeData}
        </DataTable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  datatable: {
    color: Colors.dark.text,
  },
  title: {
    fontSize: 20,
    color: Colors.dark.text,
  },
  text: {
    fontSize: 14,
    color: Colors.dark.text,
  },
  segmentedbuttons: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  search: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
