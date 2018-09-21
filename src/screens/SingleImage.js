/**
 * This screen is responsible for showing a single image with the rectangle drawn using stored path
 */

import React, { PureComponent } from 'react';
import { ImageBackground, View, AsyncStorage, StyleSheet } from 'react-native'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';


const styles = StyleSheet.create({
  container: { width: 300, height: 200, alignSelf: 'center', margin: 20 }
})


class SingleImage extends PureComponent {

  state = {
    path: []
  }
  componentDidMount () {
    AsyncStorage.getItem('path').then(value => {
      this.setState({ path: JSON.parse(value) }, () => {
        this.canvas.addPath(this.state.path)
      })

    })
  }
  render () {

    const { uri } = this.props.navigation.state.params
    console.log('...', uri, this.state.path);

    return (
      <ImageBackground style={styles.container} source={{ uri: uri }}>
        <SketchCanvas
          style={{ flex: 1 }}
          strokeColor={'red'}
          strokeWidth={7}
          ref={ref => this.canvas = ref}
          onStrokeEnd={(path) => {
            this.canvas.addPath(this.state.path)
          }}
        />
      </ImageBackground>
    );
  }
}

export default SingleImage;