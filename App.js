import { StatusBar } from 'expo-status-bar';

import React, {Component, useRef, useState, useEffect, useCallback} from 'react';
import {LogBox, Animated, AppRegistry, Button, TouchableOpacity, StyleSheet, Text, View, Dimensions} from 'react-native';
import _, { debounce } from 'lodash';
const {height,width} = Dimensions.get("screen")
const topRandom = Array(100).fill().map(e => Math.random()*height)
const leftRandom = Array(100).fill().map(e => Math.random()*width)

LogBox.ignoreAllLogs(true)

export default function App(){
	const [toggle, setToggle] = useState(false)
	const [starLat, setStarLat] = useState()
	const [starLong, setStarLong] = useState()
	const [loaded, setLoaded] = useState(false)

	const fadeAnim = useRef(new Animated.Value(0)).current

  const animate = () => {
	console.log('...animating')
	Animated.sequence([
		spinClockwise(),
		spinCounter()
	]).start()
  }

	const spinClockwise = () => {
		// Will change fadeAnim value to 1 in 3 seconds
		return Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 3000, useNativeDriver: false
		});
	};

	const spinCounter = () => {
		// Will change fadeAnim value to 0 in 3 seconds
		return Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 3000, useNativeDriver: false
		});
	};

	const spin = fadeAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	})

	const zoom = fadeAnim.interpolate({
		inputRange: [0,1],
		outputRange: [1,50]
	})
  
	const Moon = () => <TouchableOpacity onPress={handlePress} style={styles.asteroidButton}></TouchableOpacity>
  
	const Asteroid = () => 
	<Animated.View style={[styles.asteroid,{opacity: 1, transform: [{rotate: spin}]}]}>
		<View style={{position: 'absolute', height: width/3/5, width: width/3/5, borderRadius: width, backgroundColor: 'skyblue'}}/>
	</Animated.View>
  
	const performAnimation = useCallback(debounce(animate,6000,{leading: true, trailing: false}))

	const handlePress = () => {
		performAnimation()
	}

	const StarField = () => {
		const numOfStars = 100
		const zeroto1 = Math.random()
	
		const Star = ({top, left, size}) => <Animated.View style={{transform: [{rotate: spin}, {translateX: zoom}, {translateY: zoom}], top: top, left: left, position: 'absolute', height: height/3/10/2/2*size, width: height/3/10/2/2*size, borderRadius: 0, backgroundColor: 'white'}}/>
	
		return <View style={[styles.container, {color: 'red'}]}>
			{
				Array(100).fill().map((e,i)=> <Star top={loaded? starLat[i]:topRandom[i]} left={loaded? starLong[i]:leftRandom[i]} size={Math.random()}/>)
			}
		</View>
	}

	const MoonLayer = (props) => <View style={[styles.center, {position: 'absolute', height: height-30, width: width, backgroundColor: 'transparent', marginTop: 30}]}>{props.children}</View>

	useEffect(()=>{
		setStarLat(Array(100).fill().map(e => Math.random()*height))
		setStarLong(Array(100).fill().map(e => Math.random()*width))
		setLoaded(true)
	}, [])

	return (<>
		<StarField></StarField>
		<MoonLayer>
			<Text style={{position: 'absolute', top: 0, right: 0, color: 'white'}}>ht: {Math.floor(height)}</Text>
			<Text style={{position: 'absolute', top: 15, right: 0, color: 'white'}}>wdt: {Math.floor(width)}</Text>
			{/* <Text style={{position: 'absolute', top: 30, right: 0, color: 'white'}}>n: {Math.floor(rand*10)}</Text> */}
			<Asteroid/>
			<Moon/>
		</MoonLayer>
	</>);

}

const styles = StyleSheet.create({
	asteroid: {
		position: 'relative',
		height: width/2, 
		width: width/2, 
		borderRadius: 10, 
		backgroundColor: "transparent"
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
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
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
});

// You must register the main component
// with the same name as the project
AppRegistry.registerComponent(
  'my-rn-app', () => App
);
