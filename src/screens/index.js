import UploadImage from '../screens/UploadImage'
import { createStackNavigator } from 'react-navigation'
import ImageList from '../screens/ImageList'
import SingleImage from '../screens/SingleImage'

export default createStackNavigator({
  UploadImage: {
    screen: UploadImage
  },
  ListImage: {
    screen: ImageList
  },
  SingleImage: {
    screen: SingleImage
  }
})