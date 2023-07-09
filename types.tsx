/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type NO_PARAMS = undefined;
export type RootStackParamList = {
  Root: NO_PARAMS;
  NotFound: NO_PARAMS;
};

export type MainStackParamList = {
  Main: NO_PARAMS;
  CompletedScreen: NO_PARAMS;
};

export type BottomTabParamList = {
  Home: NO_PARAMS;
  News: NO_PARAMS;
  More: NO_PARAMS;
  Insight: NO_PARAMS;
};

export type HomeParamList = {
  HomeScreen: NO_PARAMS;
  PlayScreen: {
    id: string;
  };
};
export type NewsParamList = {
  NewsScreen: NO_PARAMS;
};

export type InsightParamList = {
  InsightScreen: NO_PARAMS;
};

export type MoreParamList = {
  MoreScreen: NO_PARAMS
  AboutScreen: NO_PARAMS
  HelpAndLegalScreen: NO_PARAMS
  ContactUsScreen: NO_PARAMS
}
