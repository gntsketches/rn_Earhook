import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Piano1 from './components/Piano1'

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <Text>Hello</Text>
      </View>
    </NavigationContainer>
  )
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
