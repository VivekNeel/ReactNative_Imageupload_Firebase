/**
 * This screen is responsible for showing all the uploaded images.
 */


import React, { PureComponent } from 'react';
import { FlatList, AsyncStorage, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { isEmpty } from 'lodash'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { ROUTE_NAME_SINGLE_IMAGE } from '../../Constants'

const styles = StyleSheet.create({
  image: { width: 300, height: 200, alignSelf: 'center', margin: 20 }
})

class ImageList extends PureComponent {

  state = {
    uris: []
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(ROUTE_NAME_SINGLE_IMAGE, { uri: item })}>
        <ImageBackground style={styles.image} source={{ uri: item }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={'red'}
            strokeWidth={7}
            onStrokeEnd={(path) => AsyncStorage.setItem('path', JSON.stringify(path))}
          />
        </ImageBackground></TouchableOpacity>)
  }
  async componentDidMount () {

    await AsyncStorage.getItem('ids').then(value => {
      if (!isEmpty(value)) {
        let urls = []
        for (sessionId of JSON.parse(value)) {
          firebase.storage().ref('images').child(`${sessionId}`).getDownloadURL().then(url => {
            urls.push(url)

          })
        }

        this.setState({ uris: urls })
      }
    })
  }
  render () {

    return (
      <FlatList
        data={this.state.uris}
        bounces={false}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    );
  }
}

export default ImageList;