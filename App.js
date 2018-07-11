import React from 'react'
import {Icon} from 'native-base'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import * as Screens from './app/screens/'


const Main = createBottomTabNavigator({
    tabMain: {
        screen: Screens.Browse,
        navigationOptions: {
            showLabel:false,
            tabBarIcon: ({focused}) => {
              return <Icon name="md-browsers" style={{
                color: focused == true ? '#f16334' : '#e0e0e0'
              }}/>
            }
        },
    },
    tabBookmark: {
        screen: Screens.Bookmarks,
        navigationOptions: {
            // title: 'Bookmark',
            tabBarIcon: ({focused, tintColor}) => {
              return <Icon name="md-bookmark" style={{
                color: focused == true ? '#f16334' : '#e0e0e0'
              }}/>
            }
        }
    },
    tabDownloads: {
        screen: Screens.Downloads,
        navigationOptions: {
            // title: 'Download',
            tabBarIcon: ({focused, tintColor}) => {
              return <Icon name="md-cloud-download" style={{
                color: focused == true ? '#f16334' : '#e0e0e0'
              }}/>
            }
        }
    }
},
{
    tabBarOptions: {
        showLabel: false,
    }
      
})

export default createStackNavigator({
    Main: {
        screen: Main
    },
    // // MangaDetails: {
    // //     screen: Screens.MangaDetails
    // // },
    // ChapterList: {
    //     screen: Screens.ChapterList
    // },
    // Chapter: {
    //     screen: Screens.Chapter,
    //     navigationOptions: {
    //         header: null
    //     }
    // }
}, {
    headerMode: 'none',
    mode: 'card'
})