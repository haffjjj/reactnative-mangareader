import React, { Component } from 'react'
import {Text, View, Dimensions, StatusBar, ActivityIndicator,TouchableNativeFeedback} from 'react-native'
import {Icon,Button} from 'native-base'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import GestureRecognizer from 'react-native-swipe-gestures';

import Modal from "react-native-modal"

const {width, height} = Dimensions.get('window')

export default class extends Component {

  state = {
    chapterImg: [],
    status:[{
        statusIndex: 'onLoad'
      }
    ],
    onPage: 0,
    disableStatusBar: true,
    modal:{
      dialogVisible: false,
      nextOrPrevious:'',
      title:'',
      chapter: ''
    }
    
  }
  componentDidMount(){

    this.setState({
      chapterImg: [
        'http://www.komikid.com/uploads/manga/c-sword-and-cornett/chapters/001/26.jpg',
        'http://www.komikid.com/uploads/manga/c-sword-and-cornett/chapters/001/26.jpg',
        'http://www.komikid.com/uploads/manga/c-sword-and-cornett/chapters/001/26.jpg',
      ]
    })

    this.handleOnLoadComponent()
  }

  handleOnLoadComponent = ()=>{
    for (let index = 0; index < this.state.chapterImg.length-1; index++) {
      status = this.state.status
        status.push({
          statusIndex: 'onLoad'
        })
        this.setState({
          status
      })
      
    }
  }

  handleIndexChanged = (index)=>{
    this.setState({
      onPage: index
    })
  }
  
  handleOnLoadEnd = (index) =>{
    status = this.state.status
    status[index] = {
      index,
      statusIndex: 'onLoadEnd'
    }
    this.setState({
      status
    })
  }

  handleNextChapter = ()=>{
    if(this.state.onPage == this.state.status.length-1){
      this.setState({
        modal:{
          dialogVisible: true,
          nextOrPrevious:'Baca Chapter Selanjutnya?',
          title:'Nanatsu no Taizai',
          chapter: 'Pertempuran abadi #345'
        },
        disableStatusBar: false
      })
    }
  }

  handlePreviousChapter = ()=>{
    if(this.state.onPage == 0){
      this.setState({
        modal:{
          dialogVisible: true,
          nextOrPrevious:'Baca Chapter Sebelumnya?',
          title:'Nanatsu no Taizai',
          chapter: 'Pertempuran abadi #343'
        },
        disableStatusBar: false
      })
    }

  }

  handleModalOnClose = ()=>{
    this.setState({
      modal:{...this.state.modal, dialogVisible: false},
      disableStatusBar: true
    })
  }

  render () {
    return ( 

        <View style={{flex:1}}>

          <StatusBar hidden={this.state.disableStatusBar}  />

          <Modal animationIn='bounceIn' backdropOpacity = {0.5} isVisible={this.state.modal.dialogVisible}>              
              <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>

                  <View style={{
                      width: 250,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      padding: 10,
                      alignItems:'center'
                  }}>

                  <View style={{
                      alignSelf: 'flex-end'
                  }}>
                    <TouchableNativeFeedback
                        onPress={this.handleModalOnClose}
                        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                        <Icon style={{
                            fontSize: 25,
                            color: '#878787'
                        }} name='close' />
                    </TouchableNativeFeedback>
                  </View>

                  <View style={{
                    alignItems: 'center'
                  }}>
                    <Text style={{
                        color: '#121212',
                        marginBottom: 10
                    }}>{this.state.modal.nextOrPrevious}</Text>
                    <Text style={{
                      color: '#121212'
                    }}>{this.state.modal.title}</Text>
                    <Text>{this.state.modal.chapter}</Text>
                    <Button onPress={()=>alert('onpress ya')} rounded style={{
                      width: 100,
                      height: 30,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      margin: 20,
                      backgroundColor: '#568BF2'
                    }}>
                      <Text style={{
                        color: 'white'
                      }} full>Ya</Text>
                    </Button>
                  </View>
                  


                  </View>

              </View>
          </Modal>

          <Swiper
            style={styles.wrapper}
            onIndexChanged = {this.handleIndexChanged}
            renderPagination={(index, total, context) => (
                <View>
                  <View style={styles.paginationStyle}>
                    <Text style={styles.paginationText}>
                        {index + 1}/{total}
                        {this.state.status[index].statusIndex == 'onLoad' ? (
                          <Text> Loading Bosqqq..</Text>
                        ) :null}
                    </Text>
                  </View>

                  {this.state.status[index].statusIndex == 'onLoad' ? (
                    <View style={styles.onLoad}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  ): null}
            
                </View>
              )}
            loop={false}
          >

            {this.state.chapterImg.map((item,indexes) => (
              <View style={styles.slide} key = {indexes}>
                <GestureRecognizer
                  onSwipeLeft={this.handleNextChapter}
                  onSwipeRight={this.handlePreviousChapter}
                >
                  <PhotoView
                      source={{uri: item}}
                      minimumZoomScale={0.5}
                      maximumZoomScale={3}
                      androidScaleType="fitCenter"
                      onLoadEnd ={()=>this.handleOnLoadEnd(indexes)}
                      style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height
                      }} 
                />
                </GestureRecognizer>
              </View>
            ))}
          </Swiper>     
        </View>
    )
  }
}

const styles = {
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 2,
    borderRadius: 5,
    zIndex:9
  },
  paginationText: {
    color: 'white',
    fontSize: 11,
  },
  onLoad: {
    position: 'absolute',
    left: width/2-16,
    bottom: height/2-16,
    zIndex: 10
  }
}
