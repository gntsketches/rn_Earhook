import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Play from './screens/Play'
import Menu from './screens/Menu'
import Piano1 from './components/Piano1'

const Stack = createStackNavigator();

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  appLogTest = () => {
    console.log('appLogTest!');
  }

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Play"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Play"
            component={Play}
            initialParams={{
              info: 'blank',
              appLogTest: this.appLogTest,
            }}
          />
          <Stack.Screen name="Menu" component={Menu} />
        </Stack.Navigator>
        <View>
          <Text>Hello, you can also have views alongside the Stack.Navigator, wonder if the text will wrap? Well it does.</Text>
        </View>
      </NavigationContainer>
    )
  }
}

export default App;

// const App: () => Node = () => {
//   return (
//     <SafeAreaView style={{}}>
//       <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
//         <View>
//           <Text>Test</Text>
//           <Piano1 />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
//
// export default App;
