import React,{Component} from 'react'
import {Text, FlatList, StyleSheet, Image,View, Dimensions, StatusBar, AsyncStorage} from 'react-native'

import {Container,ListItem, Body, Button, Icon, Spinner} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

import axios from 'axios'

const screenWidth = Dimensions.get('window').width
const imgResize = screenWidth/65.25

export default class App extends Component{

    state = {
        data: [],
        search: '',
        bookmarks: [],
        startPage: 0,
        onSearch: false,
        refresh: false
    }

    componentDidMount(){
        this._retrieveData()

        this.setState({
            refresh: true
        })

        this.onLoad(this.state.startPage);
    }

    onLoad = (startPage, reset = false)=>{
        axios({
            method: 'POST',
            url: 'http://192.168.43.142/api/get_mangas.php',
            // url: 'http://192.168.56.1/api/get_mangas.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              start: startPage,
              rows: 5,
              key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{
            this.setState({
                refresh:false
            })

            if(result.data.result == true){
                if(reset == false){
                    let data = this.state.data
                    data = data.concat(result.data.data)

                    this.setState({
                        data,
                        startPage: this.state.startPage + 5,
                        refresh: false
                    })
                }
                else{
                    this.setState({
                        data: result.data.data,
                        startPage: 0,
                        refresh: false
                    })
                }
            }
            else{
                alert('Terjadi Kesalahan :(')
            }

        }).catch(()=>{
            alert('Terjadi Kesalahan :(')
        })
    }

    handleSearch = ()=>{
        this.setState({
            refresh: true
        })

        axios({
            method: 'POST',
            url: 'http://192.168.43.142/api/get_mangas.php',
            // url: 'http://192.168.56.1/api/get_mangas_where.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                where: this.state.search,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{
            this.setState({
                data: result.data.data,
                refresh:false
            })
        })
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

    handleOnPull = ()=>{
        if(this.state.onSearch == false){
            this.setState({
                refresh: true,
            })
    
            this.onLoad(0,true)
        }
    }

    handleOnReach = ()=>{
        if(this.state.onSearch == false){
            this.setState({
                refresh:true
            })
            this.onLoad(this.state.startPage)
        }
    }

    handleOnSearchBack = ()=>{
        this.setState({
            refresh: true,
            onSearch: false
        })

        this.onLoad(0,true)
    }


    // AsyncStoragerr

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
                                width: 35,
                                marginTop: 2,
                                marginBottom: 10
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: 11,
                                }}>{item.score}</Text>
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
            <Container style={styles.mainWrapper}>

                <StatusBar backgroundColor='#346ad3'/>

                <ThemeProvider>
                    <Toolbar
                        centerElement="PuManga.com"
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Search',
                            onChangeText: (search)=>this.setState({search}),
                            onSearchPressed: ()=>this.setState({onSearch: true}),
                            onSearchClosed: this.handleOnSearchBack,
                            onSubmitEditing: this.handleSearch
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
                {/* <Text>{JSON.stringify(this.state.data)}</Text> */}
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {this.handleOnPull}
                    onEndReachedThreshold = {0.1}
                    onEndReached = {this.handleOnReach}
                    data={this.state.data}
                    // extraData={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: 'white'
    }
})