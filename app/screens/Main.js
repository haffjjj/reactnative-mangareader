import React,{Component} from 'react'
import {Text, FlatList, StyleSheet} from 'react-native'

import {Container,ListItem, List, Body, Right} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

export default class App extends Component{

    state = {
        data: [
            {
                id: 1,
                title: 'test'
            },
            {
                id: 2,
                title: 'test2'
            },
            {
                id: 3,
                title: 'test2'
            },
            {
                id: 4,
                title: 'test2'
            },
            {
                id: 5,
                title: 'test2'
            },
            {
                id: 6,
                title: 'test2'
            },
            {
                id: 7,
                title: 'test2'
            }
        ]
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = () => {
        alert('list onpress')
    };

    _renderItem = ({item}) => (
        <ListItem onPress={()=>alert('Manga Onpress')}>
            <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
            </Body>
            <Right>
                <Text note>3:43 pm</Text>
            </Right>
        </ListItem>
    )

    render(){
        return(
            <Container style={style.main.container}>
                <ThemeProvider>
                    <Toolbar
                        centerElement="PuManga.com"
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Search',
                            onSubmitEditing: ()=>alert('search presss')
                        }}
                        rightElement={{
                            menu: {
                                icon: "more-vert",
                                labels: ["About"]
                            }
                        }}
                        style = {{
                            container: {
                                backgroundColor: '#568BF2'
                            }
                        }}
                        onRightElementPress={ (label) => { alert(JSON.stringify(label)) }}
                    />
                </ThemeProvider>
                <List>
                    <FlatList
                        refreshing = {false}
                        onRefresh = {()=>alert('onPull')}
                        data={this.state.data}
                        // extraData={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </List>

            </Container>

        )
    }
}

const style = {
    main: StyleSheet.create({
        container:{
            backgroundColor: 'white'
        }
    })
}