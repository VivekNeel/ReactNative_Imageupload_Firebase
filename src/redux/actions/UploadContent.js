import { STATUS_FAILURE, STATUS_LOADING, STATUS_SUCCESS } from '../actionTypes'

import ImagePicker from 'react-native-image-picker'
import firebase from 'firebase'
import { Platform, AsyncStorage } from 'react-native'
import { fs } from '../../../App'

var options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


const upload = (uri, mime = 'application/octet-stream', dispatch) => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null
    const sessionId = new Date().getTime()
    const imageRef = firebase.storage().ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime, customMetadata: { title: 'sometext', desc: 'desc' } })
      })
      .then(() => {
        uploadBlob.close()
        let sessionIdsToStore = []
        // retrieve all the reference to images to be added with new one
        AsyncStorage.getItem('ids').then(value => {
          let parsedSessionId = JSON.parse(value)
          if (parsedSessionId) {
            parsedSessionId.forEach(item => {
              sessionIdsToStore.push(item)
            })
          }
          // add the current one
          sessionIdsToStore.push(sessionId)
          AsyncStorage.setItem('ids', JSON.stringify(sessionIdsToStore)).then(success => {
            // dispatch it
            dispatch(statusSuccess([]))
          }).catch(err => {
            dispatch(statusFailed([]))
          })
        }).catch(err => console.log('err', err))

        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// handles showing image picker, once image is added, it gets uploaded
const showImagePicker = () => {

  ImagePicker.showImagePicker(options, (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      upload(response.uri)
        .then(url => { alert('Image uploaded'); this.setState({ image_uri: url }) })
        .catch(error => console.log(error))

    }
  });

}
const statusLoading = () => {
  return {
    type: STATUS_LOADING
  }
}

const statusFailed = error => {
  return {
    type: STATUS_FAILURE, payload: error
  }
}

const statusSuccess = data => {
  return {
    type: STATUS_SUCCESS, payload: data
  }
}

export default uploadContent = payload => {
  return async dispatch => {
    dispatch(statusLoading)
    showImagePicker()
  }
}