import React,{Component} from 'react'
import {Text,View, FlatList,TouchableNativeFeedback,StatusBar} from 'react-native'
import {Container, ListItem, Body, Right, Button, Icon, Spinner} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

import Modal from "react-native-modal"

export default class App extends Component{

    state = {
        data: [
            {
                id: 1
            }
        ],
        modal: false
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = () => {
        alert('list onpress')
    };

    _renderItem = ({item}) => (
        <ListItem onPress={()=>this.props.navigation.navigate('Chapter')}>
            <Body>
                <Text style={{
                    color: '#121212'
                }}>Chapter #01</Text>
                <Text style={{
                    color: '#878787',
                    fontSize: 12
                }}>Pertempuran Abadi</Text>
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
                            }}>Downloading Chapter #01</Text>
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
                <FlatList
                    refreshing = {false}
                    onRefresh = {()=>alert('onPull')}
                    // onEndReachedThreshold = {0.1}
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