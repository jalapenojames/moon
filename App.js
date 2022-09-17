import { StatusBar } from 'expo-status-bar';

import React, {Component, useRef, useState, useEffect, useCallback} from 'react';
import {LogBox, Animated, AppRegistry, Button, TouchableOpacity, StyleSheet, Text, View, Dimensions, Easing, Pressable} from 'react-native';
import _, { debounce } from 'lodash';
const {height,width} = Dimensions.get("screen")
const topRandom = Array(100).fill().map(e => Math.random()*height)
const leftRandom = Array(100).fill().map(e => Math.random()*width)
const topRandom2 = Array(100).fill().map(e => Math.random()*height)
const leftRandom2 = Array(100).fill().map(e => Math.random()*width)
const topRandom3 = Array(100).fill().map(e => Math.random()*height)
const leftRandom3 = Array(100).fill().map(e => Math.random()*width)

LogBox.ignoreAllLogs(true)

export default function App(){
	const [toggle, setToggle] = useState(false)
	const [starLat, setStarLat] = useState()
	const [starLong, setStarLong] = useState()
	const [loaded, setLoaded] = useState(false)

	const fadeAnim = useRef(new Animated.Value(0)).current

  const animate = () => {
	console.log('...animating')
	Animated.loop(
		// [
			spinClockwise(),
			// spinCounter()
		// ]
	).start()
  }

	const spinClockwise = () => {
		// Will change fadeAnim value to 1 in 3 seconds
		return Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 3000, useNativeDriver: false,
			easing: Easing.linear,
		});
	};

	const spinCounter = () => {
		// Will change fadeAnim value to 0 in 3 seconds
		return Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 1000, useNativeDriver: false,
			easing: Easing.linear,
		});
	};

	const spin = fadeAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	})

	const zoomDepth = (top, left, axis) => {
		let dir = 1;	const slope = axis==='x-axis'? 1 : -(top/left).toFixed(5)
		
		const planeEdgeLength = 200
		const dydx = axis==='x-axis?' 

		// Quadrant 2
		if(top>=0 && left<=0)
			dir = -1
		// Quadrant 3
		if(top<=0 && left<=0)
			dir = -1

		return fadeAnim.interpolate({
			inputRange: [0,1],
			outputRange: [0,slope*dir*planeEdgeLength]
		})
	}

	const zoomDepth2 = (top, left, axis) => {
		let dir = 1;	const slope = axis==='x-axis'? 1 : -(top/left).toFixed(5)
		
		const planeEdgeLength = 80
		const dydx = axis==='x-axis?' 

		// Quadrant 2
		if(top>=0 && left<=0)
			dir = -1
		// Quadrant 3
		if(top<=0 && left<=0)
			dir = -1

		const distance = slope*dir*planeEdgeLength

		return fadeAnim.interpolate({
			inputRange: [0,.5,1],
			outputRange: [0,distance/2,distance]
		})
	}

	const zoomDepth3 = (top, left, axis) => {
		let dir = 1;	const slope = axis==='x-axis'? 1 : -(top/left).toFixed(5)
		
		const planeEdgeLength = 80
		const dydx = axis==='x-axis?' 

		// Quadrant 2
		if(top>=0 && left<=0)
			dir = -1
		// Quadrant 3
		if(top<=0 && left<=0)
			dir = -1

		const distance = slope*dir*planeEdgeLength

		return fadeAnim.interpolate({
			inputRange: [0,.5,1],
			outputRange: [0,0,distance/2]
		})
	}

	const opacity2 = () => {
		return fadeAnim.interpolate({
			inputRange: [0,.5,1],
			outputRange: [0,.5,1]
		})
	}	
	
	const opacity3 = () => {
		return fadeAnim.interpolate({
			inputRange: [0,.5,1],
			outputRange: [0,0,.5]
		})
	}
  
	const Moon = () => 
	<>
	<View style={[styles.moonBackground]}/>
	<TouchableOpacity onPress={handlePress} style={[styles.moon, styles.shadow]}>

	</TouchableOpacity>
	</>
  
	const Asteroid = () => 
	<Animated.View style={[styles.asteroid,{opacity: 1, transform: [{rotate: spin}]}]}>
		<Pressable onPress={performAnimation} style={{position: 'absolute', height: width/3/5, width: width/3/5, borderRadius: width, backgroundColor: 'skyblue'}}/>
	</Animated.View>
  
	const performAnimation = useCallback(debounce(animate,3000,{leading: true, trailing: false}))

	const handlePress = () => {
		performAnimation()
	}

	const StarField = () => {
		const numOfStars = 100
	
		const Star = ({top, left, size}) => {
			const convTop = (-1)*Math.floor(top-height/2)
			const convLeft = Math.floor(left-width/2)

			return <>
				{/* <Animated.View style={[styles.starShadow, {position: 'relative', transform: [{rotate: spin}, {translateX: zoom}, {translateY: zoom}], top: top, left: left, position: 'absolute', height: height/3/10/2/2*size, width: height/3/10/2/2*size, borderRadius: 0, backgroundColor: 'white'}]}>
					<Text style={{color: 'white', width: 100, height: 20, fontSize: 10}}>{`${'('+Math.floor(left-width/2)+', '+(-1)*Math.floor(top-height/2)+')'}`}</Text>
				</Animated.View> */}

				<Animated.View style={
					[
						styles.starShadow, 
						{
							position: 'relative', 
							transform: [
								{translateX: zoomDepth(convTop,convLeft,'x-axis')}, 
								{translateY: zoomDepth(convTop,convLeft,'y-axis')}
							], 
							top: top, left: left, position: 'absolute', height: height/3/10/2/2*size, width: height/3/10/2/2*size, borderRadius: 0, backgroundColor: 'white'
						}
					]}>
					{/* <Text style={{color: 'white', width: 100, height: 20, fontSize: 10}}>{
						`${'('+convLeft+', '+convTop+','+(convTop/convLeft).toFixed(2)+')'}`
					}</Text> */}
				</Animated.View>
			</>
		}
	
		return <View style={[styles.container, {color: 'red'}]}>
			{
				Array(numOfStars).fill().map((e,i)=> (
					<>
						<Star top={loaded? starLat[i]:topRandom[i]} left={loaded? starLong[i]:leftRandom[i]} size={Math.random()}/>
					</>
				))
			}
		</View>
	}

	const StarField2 = () => {
		const numOfStars = 100
	
		const Star = ({top, left, size}) => {
			const convTop = (-1)*Math.floor(top-height/2)
			const convLeft = Math.floor(left-width/2)

			return <>
				<Animated.View style={
					[
						styles.starShadow, 
						{
							position: 'relative', 
							transform: [
								{translateX: zoomDepth2(convTop,convLeft,'x-axis')}, 
								{translateY: zoomDepth2(convTop,convLeft,'y-axis')}
							], 
							opacity: opacity2(),
							top: top, left: left, position: 'absolute', height: height/3/10/2/2*size, width: height/3/10/2/2*size, borderRadius: 0, backgroundColor: 'white'
						}
					]}>
				</Animated.View>
			</>
		}
	
		return <View style={[styles.container, {color: 'red', position: 'absolute',}]}>
			{
				Array(numOfStars).fill().map((e,i)=> (
					<>
						<Star top={loaded? starLat[i]:topRandom2[i]} left={loaded? starLong[i]:leftRandom2[i]} size={Math.random()}/>
					</>
				))
			}
		</View>
	}

	const StarField3 = () => {
		const numOfStars = 100
	
		const Star = ({top, left, size}) => {
			const convTop = (-1)*Math.floor(top-height/2)
			const convLeft = Math.floor(left-width/2)

			return <>
				<Animated.View style={
					[
						styles.starShadow, 
						{
							position: 'relative', 
							transform: [
								{translateX: zoomDepth3(convTop,convLeft,'x-axis')}, 
								{translateY: zoomDepth3(convTop,convLeft,'y-axis')}
							], 
							opacity: opacity3(),
							top: top, left: left, position: 'absolute', height: height/3/10/2/2*size, width: height/3/10/2/2*size, borderRadius: 0, backgroundColor: 'white'
						}
					]}>
				</Animated.View>
			</>
		}
	
		return <View style={[styles.container, {color: 'red', position: 'absolute',}]}>
			{
				Array(numOfStars).fill().map((e,i)=> (
					<>
						<Star top={loaded? starLat[i]:topRandom3[i]} left={loaded? starLong[i]:leftRandom3[i]} size={Math.random()}/>
					</>
				))
			}
		</View>
	}

	const MoonLayer = (props) => <View style={[styles.center, {position: 'absolute', height: height-30, width: width, backgroundColor: 'transparent', marginTop: 30}]}>{props.children}</View>

	useEffect(()=>{
		setStarLat(Array(100).fill().map(e => Math.random()*height))
		setStarLong(Array(100).fill().map(e => Math.random()*width))
		setLoaded(true)
	}, [])

	return (
		<View style={{flex: 1, backgroundColor: 'lightgray', position: 'relative'}}>
			<StarField/>
			<StarField2/>
			<StarField3/>
			<MoonLayer>
				<Text style={{position: 'absolute', top: 0, right: 0, color: 'white'}}>ht: {Math.floor(height)}</Text>
				<Text style={{position: 'absolute', top: 15, right: 0, color: 'white'}}>wdt: {Math.floor(width)}</Text>
				<Asteroid/>
				{/* <Moon/> */}
			</MoonLayer>
		</View>);

}

const styles = StyleSheet.create({
	asteroid: {
		position: 'relative',
		height: width/2, 
		width: width/2, 
		borderRadius: 10, 
		backgroundColor: "transparent"
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
	starShadow: {
		shadowColor: "white",
		shadowOffset: {
			height: -5,
			width: 5,
		},
		shadowOpacity: .2,
		shadowRadius: 5,
		elevation: 6,
	},
	shadow: {
		shadowColor: "lightblue",
		shadowOffset: {
			height: 20,
			width: 20,
		},
		shadowOpacity: .2,
		shadowRadius: 15,
		elevation: 20
	},
	moon: {
		position: 'absolute',
		height: width/3,
		width: width/3,
		borderRadius: width,
		backgroundColor: "white",
		left: width/2-2*width/3/5-10,
		top: height/2-width/3/2-10,
	},
	moonBackground: {
		position: 'absolute', 
		zIndex: 0,
		top: height/2-height/6,
		left: width/2-width/4,
		height: width/2, 
		width: width/2, 
		backgroundColor: 'transparent'
	}
});

// You must register the main component
// with the same name as the project
AppRegistry.registerComponent(
  'my-rn-app', () => App
);
