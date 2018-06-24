import React,{Component} from 'react'
import {Text,View, FlatList} from 'react-native'
import {Container, ListItem, Body, Right, Button, Icon} from 'native-base'

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
        modal: true
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = () => {
        alert('list onpress')
    };

    _renderItem = ({item}) => (
        <ListItem onPress={()=>alert('goto Chapter')}>
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
                <Button transparent  onPress={()=>this.handleModal(true)}>
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
                    <View style={{ flex: 1 }}>
                        <Button onPress={()=>this.handleModal(false)}>
                            <Text>Close</Text>
                        </Button>
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