import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import GestureRecognizer from 'react-native-swipe-gestures';


const { width } = Dimensions.get('window')
const loading = require('../assets/img/loading.gif')

const Slide = props => {
  return (<View style={styles.slide}>

    <PhotoView
       source={{uri: props.uri}}
       minimumZoomScale={0.5}
       maximumZoomScale={3}
       androidScaleType="fitCenter"
       onLoad = {props.loadHandle.bind(null, props.i)}
       style={{
         width: Dimensions.get('window').width,
         height: Dimensions.get('window').height
       }} 
     />
    {
      !props.loaded && <View style={styles.loadingView}>
        <Image style={styles.loadingImage} source={loading} />
      </View>
    }
  </View>)
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.loadHandle = this.loadHandle.bind(this)
  }

  state = {
    pageList: [],
    loadQueue: [0, 0, 0],
    page:{
      index: 1,
      total: 0
    }
  }

  async componentDidMount(){
    let pageList = await this.props.navigation.getParam('pageList')

    await this.setState({
      pageList: pageList
    })

    this.getTotalPage()
  }
  
  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({
      loadQueue
    })
  }

  getTotalPage = ()=>{
    this.setState({
      page: {
        ...this.state.page,
        total: this.state.pageList.length
      }
    })
  }

  onIndexChanged = (index)=>{
    this.setState({
      page: {
        ...this.state.page,
        index: index+1
      }
    })
  }

  nextChapter = ()=>{
    if(this.state.page.index == this.state.page.total){
      alert('nextChapter')
    }
  }

  previousChapter = ()=>{
    if(this.state.page.index == 1){
      alert('previousChapter')
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={styles.page}>
          <Text style={styles.pageText}>{this.state.page.index}/{this.state.page.total}</Text>
        </View>
        <Swiper 
          showsPagination={false}
          loadMinimal 
          loadMinimalSize={1} 
          style={styles.wrapper} 
          loop={false}
          onIndexChanged = {(index)=>this.onIndexChanged(index)}
        >
          {
            this.state.pageList.map((item, i) => (
              // <GestureRecognizer
              //     // onSwipeLeft=
              //     // onSwipeRight={()=>alert('right')}
              //     style = {{flex:1}}
              // >
                <Slide
                  loadHandle={this.loadHandle}
                  loaded={!!this.state.loadQueue[i]}
                  uri={item.image}
                  i={i}
                  key={i} 
                />
              // </GestureRecognizer>

            ))
          }
        </Swiper>
      </View>
    )
  }
}


const styles = {
  wrapper: {
  },
  page: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 3,
    zIndex: 1,
    paddingLeft: 5,
    paddingRight:5
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  loadingImage: {
    width: 60,
    height: 60
  }
}
