import { StatusBar } from 'expo-status-bar';
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {Component, useRef, useState} from 'react';
import {Animated, AppRegistry, Button, TouchableOpacity, StyleSheet, Text, View, Dimensions} from 'react-native';
const {height,width} = Dimensions.get("screen")

export default function App(){
  const [toggle, setToggle] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };
  
  const spin = fadeAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
  
  const Moon = () => <Animated.View style={[styles.moon,{opacity: 1, transform: [{rotate: spin}]}]}/>
  
  const Asteroid = () => <Animated.View style={[styles.asteroid,{opacity: 1, transform: [{rotate: spin}]}]}>
    <View style={{position: 'absolute', height: width/3/5, width: width/3/5, borderRadius: width, backgroundColor: 'skyblue'}}/>
  </Animated.View>
  
  const handlePress = () => {
    if(toggle) {
      fadeOut()
      setToggle(!toggle)
    }
    else {
      fadeIn()
      setToggle(!toggle)
    }
  }

  return (
    <View style={styles.container}>
      <Moon/>
      <Asteroid/>
      <TouchableOpacity onPress={handlePress} style={styles.asteroidButton}>
      </TouchableOpacity>
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2734',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#B0B0B0',
    marginBottom: 5,
  },
  moon: {
    position: 'absolute',
    height: width/3, 
    width: width/3, 
    left: width/3/2,
    borderRadius: width, 
    backgroundColor: "transparent",
  },
  asteroidButton: {
    position: 'absolute',
    height: width/3,
    width: width/3,
    borderRadius: width,
    backgroundColor: "white",
    left: width/2-2*width/3/5-10,
    top: height/2-width/3/2-10,
    shadowColor: "lightblue",
    shadowOffset: {
              width: 10,
              height: -10
            },
    shadowOpacity: .5,
    shadowRadius: 10,
  },
  asteroid: {
    position: 'relative',
    height: width/2, 
    width: width/2, 
    borderRadius: 10, 
    backgroundColor: "transparent"
  }
});

// You must register the main component
// with the same name as the project
AppRegistry.registerComponent(
  'my-rn-app', () => MyApp
);
