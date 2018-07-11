import React,{Component} from 'react'
import {Text, View, StyleSheet, Dimensions, Image,StatusBar} from 'react-native'
import {Content, Container, Button, Spinner} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

import axios from 'axios'

const screenWidth = Dimensions.get('window').width
const imgResize =  screenWidth/9*4/65.25

class Main extends Component{
    render(){
        return(
            <View style={{
                flex: 1 
            }}>

                <View style={{
                    flex: 3,
                    flexDirection: 'row',
                    padding:5
                }}>

                    <View style={{
                        flex: 4,
                        alignItems: 'center',
                        justifyContent:'flex-start',
                        paddingTop: 10
                    }}>

                        <Image
                            style={{
                                width: imgResize*55, 
                                height: imgResize*75,
                                borderRadius: 8
                            }}
                            source={{uri: this.props.img}}
                        />

                    </View>

                    <View style={{
                        flex:5
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: '#989898',
                            marginTop: 10

                        }}>Name</Text>

                        <Text style={{
                            color: '#121212',
                            marginBottom: 10
                        }}>{this.props.title}</Text>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1
                            }}>

                                <Text style={{
                                    fontSize: 12,
                                    color: '#989898'
                                }}>Ranked #{this.props.ranked}</Text>

                            </View>
                            <View style={{
                                flex: 1
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#989898'
                                }}>Popularity #{this.props.popularity}</Text>
                            </View>
                        </View>
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
                            }}>{this.props.score}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1
                            }}>

                                <Text style={{
                                    fontSize: 12,
                                    color: '#121212'
                                }}>Source</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#989898'
                                }}>Myanimelist</Text>

                            </View>
                            <View style={{
                                flex: 1
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#121212'
                                }}>Last Update</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#989898'
                                }}>17 April</Text>
                            </View>
                        </View>

                    </View>


                </View>
                <View style={{
                    flex: 4,
                    backgroundColor: '#f7f7f7'
                }}>

                    <Content style={{
                        padding: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                            <View style={{
                                width: 7,
                                height: 7,
                                backgroundColor: '#568BF2',
                                borderRadius: 50
                            }}/>
                            <Text style={{
                                color: '#121212',
                                marginLeft: 5
                            }}>Synopsis</Text>
                        </View>
                        <Text style={{
                            paddingBottom: 20
                        }}>{this.props.synopsis}</Text>
                    </Content>
                    <Button full onPress={()=>this.props.navigation.navigate('ChapterList')} style={{
                        backgroundColor: '#568BF2'
                    }}>
                        <Text style={{
                            color: 'white'
                        }}>Read now</Text>
                    </Button>

                </View>
            </View>

            
        )
    }
}

export default class App extends Component{

    state = {
        manga: {
            title:'jondes'
        },
        refresh: false
    }

    componentDidMount(){

        this.setState({
            refresh: true
        })

        axios({
            method: 'POST',
            url: 'http://192.168.43.142/api/get_manga_details.php',
            // url: 'http://192.168.56.1/api/get_manga_details.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id: 29,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        }).then((result)=>{
            this.setState({
                manga: result.data.data[0],
                refresh:false
            })
        }).catch((result)=>{
            alert(result)
        })
    }

    render(){
        return(
            <Container style={style.main.container}>
                <StatusBar backgroundColor='#346ad3'/>
                <ThemeProvider>
                    <Toolbar
                        leftElement="arrow-back"
                        centerElement="Manga Details"
                        onLeftElementPress={()=>this.props.navigation.goBack()}
                        style = {{
                            container: {
                                backgroundColor: '#568BF2'
                            }
                        }}
                    />
                </ThemeProvider>
                
                {/* <Text>{JSON.stringify(this.state.manga)}</Text> */}

                {this.state.refresh == true ? (
                     <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Spinner color='blue' />
    
                    </View>
                ): (
                    <Main 
                        img = {this.state.manga.img}
                        title = {this.state.manga.title}
                        ranked = {this.state.manga.ranked}
                        popularity = {this.state.manga.popularity}
                        score = {this.state.manga.score}
                        synopsis = {this.state.manga.synopsis}
                    />
                )}                 
            </Container>
        )
    }
}

const style = {
    main: StyleSheet.create({
        container: {
            backgroundColor: 'white'
        }
    })
}