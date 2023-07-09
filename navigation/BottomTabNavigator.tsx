import {
  AntDesign as Icon,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import HomeScreen from '../screens/Home';
import MoreScreen from '../screens/More';
import NewsScreen from '../screens/News';
import InsightScreen from '../screens/Insight';
import AboutPage from '../screens/More/About';
import HelpAndLegalPage from '../screens/More/HelpAndLegal';
import ContactUsPage from '../screens/More/ContactUs';
import {
  BottomTabParamList,
  HomeParamList,
  MoreParamList,
  NewsParamList,
  InsightParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='News'
        component={NewsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='newspaper-variant-outline'
              size={25}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='Insight'
        component={InsightNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='md-stats-chart-sharp' size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='More'
        component={MoreNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='setting' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>['name'];
  color: string;
}) {
  return <Icon size={25} style={styles.tabBarIcon} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function TabOneNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.dark.title,
        }}
      >
        <HomeStack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerTitle: 'Home',
          }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

// const StatsStack = createStackNavigator<StatsParamList>()
const NewsStack = createStackNavigator<NewsParamList>();

function NewsNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name='NewsScreen'
        component={NewsScreen}
        options={{
          headerTitle: 'News',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </NewsStack.Navigator>
  );
}
const InsightStack = createStackNavigator<InsightParamList>();

function InsightNavigator() {
  return (
    <InsightStack.Navigator>
      <InsightStack.Screen
        name='InsightScreen'
        component={InsightScreen}
        options={{
          headerTitle: 'Insight',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </InsightStack.Navigator>
  );
}

const MoreStack = createStackNavigator<MoreParamList>();

function MoreNavigator() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name='MoreScreen'
        component={MoreScreen}
        options={{
          headerTitle: 'More',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <MoreStack.Screen
        name='AboutScreen'
        component={AboutPage}
        options={{
          headerBackTestID: 'headerBack',
          headerTintColor: Colors.light.white,
          headerBackTitle: 'Back',
          headerTitle: 'About the App',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <MoreStack.Screen
        name="HelpAndLegalScreen"
        component={HelpAndLegalPage}
        options={{
          headerBackTestID: 'headerBack',
          headerTintColor: Colors.light.white,
          headerBackTitle: 'Back',
          headerTitle: 'Help And Legal',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <MoreStack.Screen
        name="ContactUsScreen"
        component={ContactUsPage}
        options={{
          headerBackTestID: 'headerBack',
          headerTintColor: Colors.light.white,
          headerBackTitle: 'Back',
          headerTitle: 'Contact Us',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </MoreStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    color: Colors.dark.title,
    fontSize: 20,
  },
  header: {
    backgroundColor: Colors.dark.background,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
