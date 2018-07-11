import React,{Component} from 'react'
import {Text,View, FlatList,TouchableNativeFeedback,StatusBar} from 'react-native'
import {Container, ListItem, Body, Right, Button, Icon, Spinner} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

import Modal from "react-native-modal"

import axios from 'axios'

export default class App extends Component{

    state = {
        data: [],
        modal: false,
        refresh: false
    }

    componentDidMount(){
        this.setState({
            refresh: true
        })

        this.onLoad()
        
    }

    onLoad = ()=>{
        axios({
            method: 'POST',
            url: 'http://192.168.43.142/api/get_chapters.php',
            // url: 'http://192.168.56.1/api/get_chapters.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id: 59,
                start: 0,
                rows: 10,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{
            this.setState({
                data: result.data.data,
                refresh:false
            })
        }).catch((result)=>{
            alert(result)
        })
    }

    handleOnPull = ()=>{
        this.setState({
            refresh: true
        })
        this.onLoad()
    }

    goPages = ()=>{

        axios({
            method: 'POST',
            url: 'http://192.168.43.142/api/get_pages.php',
            // url: 'http://192.168.56.1/api/get_pages.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id: 82,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{

            this.props.navigation.navigate('Chapter',{
                pageList: result.data.data
            })

        }).catch((result)=>{
            alert(result)
        })
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = () => {
        alert('list onpress')
    };

    _renderItem = ({item}) => (
        <ListItem onPress={this.goPages}>
            <Body>
                <Text style={{
                    color: '#121212'
                }}>Chapter #{item.chapter}</Text>
                <Text style={{
                    color: '#878787',
                    fontSize: 12
                }}>{item.title}</Text>
            </Body>
            <Right>
                <Button transparent onPress={()=>this.handleModal(true)}>
                    <Icon name='ios-cloud-download-outline' />
                </Button>
            </Right>
        </ListItem>
    )

    handleModal(boll){
        this.setState({
            modal: boll
        })
    }

    render(){
        return(
            <Container style={{
                backgroundColor: 'white'
            }}>
                <StatusBar backgroundColor='#346ad3'/>

                <ThemeProvider>
                    <Toolbar
                        leftElement="arrow-back"
                        centerElement="Chapter List"
                        onLeftElementPress={()=>this.props.navigation.goBack()}
                        style = {{
                            container: {
                                backgroundColor: '#568BF2'
                            }
                        }}
                    />
                </ThemeProvider>

                <Modal isVisible={this.state.modal}>
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
                                    onPress={()=>this.handleModal(false)}
                                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                                    <Icon style={{
                                        fontSize: 20,
                                        color: '#878787'
                                    }} name='close' />
                                </TouchableNativeFeedback>
                            </View>

                            <Text style={{
                                color: '#121212'
                            }}>Coming soon bosqu</Text>
                            <Text>Please Wait..</Text>
                            <Spinner color='#568BF2' />
                            <Text style={{
                                marginTop: 10
                            }}>

                            Downloading 1/20..
                            </Text>    
                        </View>

                    </View>
                </Modal>

                <View style={{
                    backgroundColor: '#FAFAFA',
                    padding: 6
                }}>
                    <Text style={{
                        fontSize: 12,
                        textAlign: 'center',
                        color: '878787'
                    }}>Nanatsu no Taizai</Text>
                </View>
                {/* <Text>{JSON.stringify(this.state.data)}</Text> */}
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {this.handleOnPull}
                    onEndReachedThreshold = {0.1}
                    // onEndReached = {() =>alert('end reach')}
                    data={this.state.data}
                    // extraData={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </Container>
        )
    }
}