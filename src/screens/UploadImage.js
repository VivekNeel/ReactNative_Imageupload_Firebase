/**
 * This screen is the home screen allows to upload images. It's connect to redux to handle states.
 */

import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native'
import uploadContent from '../redux/actions/UploadContent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ROUTE_NAME_LIST_IMAGE } from '../../Constants'

class UploadImage extends Component<Props> {


  uploadContent = () => {
    this.props.uploadContent()

  }

  navigateToImageListScreen = () => {
    this.props.navigation.navigate(ROUTE_NAME_LIST_IMAGE)
  }


  render () {


    return (
      <View style={styles.container}>
        <Button title={"Select Image"} onPress={() => {
          this.uploadContent()
        }} />

        <Button title={"UPLOAD"} onPress={() => {
          this.uploadContent()
        }} />
        <Button title={"Uploaded Images"} onPress={() => {
          this.navigateToImageListScreen()
        }} />

      </View>
    );
  }
}
export default connect(state => ({ content: state }), dispatch => bindActionCreators({ uploadContent }, dispatch))(UploadImage)

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
