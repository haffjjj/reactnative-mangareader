import React,{Component} from 'react'
import {Text, FlatList, StyleSheet, Image,View, Dimensions, StatusBar, AsyncStorage} from 'react-native'

import {Container,ListItem, Body, Button, Icon, Toast} from 'native-base'

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
        ],
        bookmarks: []
    }

    componentDidMount(){
        this._retrieveData()
    }

    // AsyncStorage

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('mangaBookmarks')
          if (value !== null) {
            // We have data!!
            this.setState({
                bookmarks: JSON.parse(value)
            })

            // alert(value)
          }
         } catch (error) {
           // Error retrieving data
         }
      }

    _storeData = async (bookmarksData) => {
        try {
          await AsyncStorage.setItem('mangaBookmarks', bookmarksData)
        } catch (error) {
          // Error saving data
        }
    }

    // endAsyncStorage
    
    _keyExtractor = (item, index) => item.id

    _onPressItem = () => {
        alert('list onpress')
    }
    
    handleBookmark = (id)=>{
        let bookmarks = this.state.bookmarks

        if(bookmarks.includes(id)){
            bookmarks = bookmarks.filter(item => item !== id)
        }
        else{
            bookmarks.push(id)
        }

        this.setState({bookmarks})        
        this._storeData(JSON.stringify(bookmarks))
    }

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
                    <Button transparent onPress={()=>this.handleBookmark(item.id)} style={{
                        alignSelf: 'center',
                        flex: 1
                    }}>
                    
                        <Icon style={{
                            color: 'red',
                            fontSize: 15
                        }}  name={this.state.bookmarks.includes(item.id) == true ? 'ios-heart' : 'ios-heart-outline'} />
                    </Button>
                </View>
            </Body>
        </ListItem>
    )

    // endFlatlist

    render(){
        return(
            <Container style={style.main.container}>
                <StatusBar backgroundColor='#346ad3'/>
                <ThemeProvider>
                    <Toolbar
                        centerElement="Bookmarks"
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Search',
                            onSubmitEditing: ()=>alert('search presss')
                        }}
                        style = {{
                            container: {
                                backgroundColor: '#568BF2'
                            }
                        }}
                    />
                </ThemeProvider>
                {/* <Text>{JSON.stringify(this.state.bookmarks)}</Text> */}
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