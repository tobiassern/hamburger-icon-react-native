'use-strict'

/**--- Node Modules ---**/
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';

/**--- Redux ---**/

/**--- Core ---**/

/**--- Components ---**/

/**--- Views ---**/


export default class HamburgerIcon extends Component {

    constructor(props, context) {
        super(props, context);
       	this.animation = new Animated.Value(0);
       	this.state = ({open: false});
    }

    _animate() {
    	if(!this.state.open) {
		  	Animated.timing(
		    	this.animation,
		    	{
		      		toValue: 1,
		      		duration: 350,
		      		easing: Easing.easeOut,
		      		useNativeDriver: true
		    	}
		  	).start();
		  } else {
		  	Animated.timing(
		    	this.animation,
		    	{
		      		toValue: 0,
		      		duration: 350,
		      		easing: Easing.easeIn,
		      		useNativeDriver: true
		    	}
		  	).start();
		  }
		  this.props.onPress(!this.props.open);
		  this.setState({open: !this.state.open})
    }

  	render() {
        const rotateFirstLine = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg']
        });
        const moveFirstLine = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 6]
        });
        const rotateSecondLine = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-45deg']
        });
        const moveSecondLine = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -5]
        });
        const moveMiddleLine = this.animation.interpolate({
        	inputRange: [0, 1],
        	outputRange: [0, -8]
        });
        const opacityMiddleLine = this.animation.interpolate({
        	inputRange: [0, 1],
        	outputRange: [1, 0]
        });
	    return (
	        <TouchableOpacity style={styles.headerIcon} onPress={() => this._animate()}>
	            <Animated.View style={[styles.headerIconLine, {
            	    transform: [{
        				translateY: moveFirstLine
    				},
    				{
        				rotate: rotateFirstLine
    				}]
	            }]} />
	            <Animated.View style={[styles.headerIconLine, {
	            	opacity: opacityMiddleLine,
	            	transform: [{
	            		translateX: moveMiddleLine
	            	}]
	            }]} />
	            <Animated.View style={[styles.headerIconLine, {
            	    transform: [{
        				translateY: moveSecondLine
    				},
    				{
        				rotate: rotateSecondLine
    				}]
	            }]} />
	        </TouchableOpacity>
	    );
  	}
}

/**-- PropTypes --**/
HamburgerIcon.propTypes = {
	open: React.PropTypes.bool,
	onPress: React.PropTypes.func
}

HamburgerIcon.defaultProps = {
	open: false,
	onPress: (() => console.log('pressing'))
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerIconLine: {
    height: 1,
    width: 19,
    backgroundColor: '#333333'
  }
});
