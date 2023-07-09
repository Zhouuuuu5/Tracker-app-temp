import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import Screen from '../../components/Screen'
import { NewsParamList } from '../../types'
import { View, Text } from '../../components/Themed'

import Colors from '../../constants/Colors';
import { Button, Card, IconButton, Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface Props {
  navigation: StackNavigationProp<NewsParamList, 'NewsScreen'>
}

export default function News({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

  return (
    <Screen scroll style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 7 }}>
            <Searchbar
              placeholder='Search'
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.search}
              placeholderTextColor={Colors.light.text}
              iconColor={Colors.light.text}
              >
            </Searchbar>
          </View>
          <View style={{ flex: 1 }}>
            <IconButton
              icon="dots-horizontal"
              iconColor={Colors.dark.text}
            />
          </View>
        </View>
        <View style={{ flex: 1, padding: 16 }}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>64-year old Ms. Hu (right) was stabbed to death in her Duboce Triangle apartment Friday AM.</Text>
              <Text style={styles.text}>64-year old Ms. Hu (right) was stabbed to death in her Duboce Triangle apartment Friday AM. Family says the man arrested, 41-year old Jesus Esparza lived in the unit right nextdoor. Ms. Hu’s niece says she was just trying to get her mail</Text>
              <Text style={styles.footer}>
                Source | California | 05/09/2023
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Allen mall shooting: What we know about the victims.</Text>
              <Text style={styles.text}>At least eight people were killed in a mass shooting at the Allen Premium Outlets mall in Allen, Texas, on Saturday, May 6.</Text>
              <Text style={styles.footer}>Source | Texas | 05/06/2023</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>State opens investigation into Wausau teacher accused of anti-Asian slur.</Text>
              <Text style={styles.text}>A teacher at Wausau East High School in Wisconsin, Rob Perkins, is being investigated by the state Department of Public Instruction over allegations of using anti-Asian racial slurs.</Text>
              <Text style={styles.footer}>Source | Wisconsin | 05/04/2023</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
  },
  search: {
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.dark.text,
    color: Colors.dark.text,
    flex: 1,
  },
  card: {
    marginBottom: 16,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.dark.text,
  },
  text: {
    color: Colors.dark.text,
  },
  footer: {
    marginTop: 10,
    color: Colors.dark.text,
    flexDirection: 'row', 
    alignItems: 'center',
  },
});
