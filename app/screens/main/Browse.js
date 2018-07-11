import React,{Component} from 'react'
import {Text, FlatList, StyleSheet, Image,View, Dimensions, StatusBar, AsyncStorage} from 'react-native'

import {Container,ListItem, Body, Button, Icon, Spinner} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

import axios from 'axios'

const screenWidth = Dimensions.get('window').width
const imgResize = screenWidth/65.25
const errorMessage = "Maaf terjadi kesalahan"
const rows = 5

export default class App extends Component{

    state = {
        data: [],
        search: '',
        bookmarks: [],
        startPage: 0,
        onSearch: false,
        onReach: false,
        isLoading: false
    }

    componentDidMount(){
        this._retrieveData()

        this.setState({
            isLoading: true
        })

        this.getMangaData(this.state.startPage);
    }

    getMangaData = (startPage, reset = false)=>{
        axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_mangas.php',
            url: 'http://192.168.56.1/api/get_mangas.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              start: startPage,
              rows,
              key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{
            this.setState({
                isLoading:false
            })

            if(result.data.result == true){
                if(reset == false){
                    let data = this.state.data
                    data = data.concat(result.data.data)

                    this.setState({
                        data,
                        startPage: this.state.startPage + 5,
                        isLoading: false
                    })
                }
                else{
                    this.setState({
                        data: result.data.data,
                        startPage: 0,
                        isLoading: false
                    })
                }
            }
            else{
                alert(errorMessage)
            }

        }).catch(()=>{
            alert(errorMessage)
        })
    }

    handleSearch = ()=>{
        this.setState({
            isLoading: true
        })

        axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_mangas.php',
            url: 'http://192.168.56.1/api/get_mangas_where.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                where: this.state.search,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{
            this.setState({
                data: result.data.data,
                isLoading:false,
                onReach: false
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
                isLoading: true,
            })
    
            this.getMangaData(0,true)
        }
    }

    handleOnReach = ()=>{
        if(this.state.onSearch == false){
            this.setState({
                onReach: true
            })
            this.getMangaData(this.state.startPage)
        }
    }

    handleOnSearchBack = ()=>{
        this.setState({
            isLoading: true,
            onSearch: false
        })

        this.getMangaData(0,true)
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('mangaBookmarks')
          if (value !== null) {
            this.setState({
                bookmarks: JSON.parse(value)
            })
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

    _keyExtractor = (item, index) => item.id

    _onPressItem = () => {
        alert('list onpress')
    }

    _renderItem = ({item}) => (
        <ListItem onPress={()=>this.props.navigation.navigate('MangaDetails')}>
            <Body>
                <View style={styles.listWrapper}>

                    <View style={styles.listItem}>
                        <Image
                            style={styles.listImage}
                            source={{uri: item.img}}
                        />
                        <View style={styles.listItemContent}>
                            <Text style={styles.listItemTitle}>{item.title}</Text>
                            <View  style={styles.listItemScoreWrapper}>
                                <Text style={styles.listItemScore}>{item.score}</Text>
                            </View>
                            <Text style={styles.listItemPopularity}>Popularity #{item.popularity}</Text>
                            <Text style={styles.listItemRanked}>Ranked #{item.ranked}</Text>
                        </View>
                    </View>

                    <Button transparent onPress={()=>this.handleBookmark(item.id)} style={styles.listItemBookmark}>
                        <Icon style={styles.listItemBookmarkIcon}  name={this.state.bookmarks.includes(item.id) == true ? 'ios-heart' : 'ios-heart-outline'} />
                    </Button>

                </View>
            </Body>
        </ListItem>
    )

    listEmptyData = ()=>{
        return(
            <View style={styles.noDataWrapper}>
                <Text>{this.state.onSearch == false ? 'No data to display, or still loading..' : 'No Results :('}</Text>
            </View>
        )
    }

    listFooterComponent = ()=>{
        return(
            <View>{this.state.onReach == true ? <Spinner color='#e0e0e0' /> : null}</View>
        )
    }

    render(){
        return(
            <Container style={styles.mainWrapper}>

                <StatusBar backgroundColor='#d14e23'/>

                <ThemeProvider>
                    <Toolbar
                        centerElement="pukomik.com"
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
                                backgroundColor: '#f16334'
                            }
                        }}
                        onRightElementPress={ (label) => { alert(JSON.stringify(label)) }}
                    />
                </ThemeProvider>
                    {/* <Text>{JSON.stringify(this.state.bookmarks)}</Text> */}
                    <FlatList
                        refreshing = {this.state.isLoading}
                        onRefresh = {this.handleOnPull}
                        onEndReachedThreshold = {0.1}
                        onEndReached = {this.handleOnReach}
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ListEmptyComponent={this.listEmptyData}
                        ListFooterComponent={this.listFooterComponent}
                    />

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: 'white'
    },
    listWrapper:{
        flex: 1,
        flexDirection: 'row'
    },
    listItem:{
        flex: 5, 
        flexDirection: 'row'
    },
    listImage: {
        width: imgResize*20, 
        height: imgResize*30,
        borderRadius: 8
    },
    listItemContent: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    listItemTitle: {
        color: '#121212'
    },
    listItemScoreWrapper: {
        backgroundColor: '#f16334',
        borderRadius: 50,
        width: 35,
        marginTop: 2,
        marginBottom: 10
    },
    listItemScore: {
        textAlign: 'center',
        color: 'white',
        fontSize: 11,
    },
    listItemPopularity: {
        fontSize: 12,
        color: '#878787'
    },
    listItemRanked:{
        fontSize: 12,
        color: '#878787'
    },
    listItemBookmark: {
        alignSelf: 'center',
        flex: 1
    },
    listItemBookmarkIcon:{
        color: 'red',
        fontSize: 15
    },
    noDataWrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#f4f4f4',
        borderRadius: 50,
        margin: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15
    }
})