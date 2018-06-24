import React,{Component} from 'react'
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native'
import {Content, Container, Button} from 'native-base'

import { Toolbar } from 'react-native-material-ui'
import { ThemeProvider } from 'react-native-material-ui'

const screenWidth = Dimensions.get('window').width
const imgResize =  screenWidth/9*4/65.25

export default class App extends Component{
    render(){
        return(
            <Container style={style.main.container}>
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
                                source={{uri: 'https://myanimelist.cdn-dena.com/images/manga/2/153111.jpg'}}
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
                            }}>Nanatsu No Taizai</Text>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1
                                }}>

                                    <Text style={{
                                        fontSize: 12,
                                        color: '#989898'
                                    }}>Ranked #23</Text>

                                </View>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#989898'
                                    }}>Popularity #23</Text>
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
                                }}>6.9</Text>
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
                            }}>
                            The "Seven Deadly Sins," a group of evil knights who conspired to overthrow the kingdom of Britannia, were said to have been eradicated by the Holy Knights, although some claim that they still live. Ten years later, the Holy Knights have staged a Coup d'état and captured the king, becoming the new, tyrannical rulers of the kingdom. Elizabeth, the king's third daughter, sets out on a journey to find the "Seven Deadly Sins," and to enlist their help in taking back the kingdom.
                            The "Seven Deadly Sins," a group of evil knights who conspired to overthrow the kingdom of Britannia, were said to have been eradicated by the Holy Knights, although some claim that they still live. Ten years later, the Holy Knights have staged a Coup d'état and captured the king, becoming the new, tyrannical rulers of the kingdom. Elizabeth, the king's third daughter, sets out on a journey to find the "Seven Deadly Sins," and to enlist their help in taking back the kingdom.
                            </Text>
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