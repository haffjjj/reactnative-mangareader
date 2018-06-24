import React,{Component} from 'react'
import {Text, FlatList, StyleSheet, Image,View, Dimensions} from 'react-native'

import {Container,ListItem, List, Body, Left, Button, Icon, Content} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

const screenWidth = Dimensions.get('window').width
const imgResize = screenWidth/65.25

export default class App extends Component{

    state = {
        data: [
            {
                id: 1,
                img: 'https://myanimelist.cdn-dena.com/images/manga/2/153111.jpg',
                title: 'Nanatsu no Taizai',
                rating: 8.5,
                popularity: 45,
                ranked: 34,
            },
            {
                id: 2,
                img: 'https://myanimelist.cdn-dena.com/images/anime/4/78280.jpg',
                title: 'Boruto: Naruto the Movie',
                rating: 6,
                popularity: 335,
                ranked: 3344,
            },
            {
                id: 3,
                img: 'https://myanimelist.cdn-dena.com/images/anime/4/78280.jpg',
                title: 'Boruto: Naruto the Movie',
                rating: 6,
                popularity: 335,
                ranked: 3344,
            }
        ]
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = () => {
        alert('list onpress')
    };

    _renderItem = ({item}) => (
        <ListItem onPress={()=>this.props.navigation.navigate('MangaDetails')}>
            <Body>
                <View style={{flex: 1,flexDirection: 'row'}}>

                    <View style={{flex: 5, flexDirection: 'row',}}>
                            <Image
                                style={{
                                    width: imgResize*20, 
                                    height: imgResize*30,
                                    borderRadius: 8
                                }}
                                source={{uri: item.img}}
                            />
                        <View style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}>
                            <Text style={{
                                color: '#121212'
                            }}>{item.title}</Text>
                            <View  style={{
                                backgroundColor: '#568BF2',
                                borderRadius: 50,
                                width: 30,
                                marginTop: 2,
                                marginBottom: 10
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: 11,
                                }}>{item.rating}</Text>
                            </View>
                            <Text style={{
                                fontSize: 12,
                                color: '#878787'
                            }}>Popularity #{item.popularity}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: '#878787'
                            }}>Ranked #{item.ranked}</Text>
                        </View>
                    </View>
                    <Button transparent style={{
                        alignSelf: 'center',
                        flex: 1
                    }}>
                        <Icon style={{
                            color: 'red',
                            fontSize: 15
                        }} name='ios-heart-outline' />
                    </Button>
                </View>
            </Body>
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
                                labels: ["About","Settings"]
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
                        <FlatList
                            refreshing = {false}
                            onRefresh = {()=>alert('onPull')}
                            onEndReachedThreshold = {0.1}
                            onEndReached = {() =>alert('end reach')}
                            data={this.state.data}
                            // extraData={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
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