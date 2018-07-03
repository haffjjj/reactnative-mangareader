import React from 'react'
import {Icon} from 'native-base'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import * as Screens from './app/screens/'


const Main = createBottomTabNavigator({
    tabMain: {
        screen: Screens.Browse,
        navigationOptions: {
            title: 'Browse',
            tabBarIcon: ({focused, tintColor}) => {
              return <Icon name="ios-browsers-outline" style={{
                color: tintColor
              }}/>
            }
        }
    },
    tabBookmark: {
        screen: Screens.Bookmarks,
        navigationOptions: {
            title: 'Bookmark',
            tabBarIcon: ({focused, tintColor}) => {
              return <Icon name="ios-bookmark-outline" style={{
                color: tintColor
              }}/>
            }
        }
    },
    tabDownloads: {
        screen: Screens.Downloads,
        navigationOptions: {
            title: 'Download',
            tabBarIcon: ({focused, tintColor}) => {
              return <Icon name="ios-cloud-download-outline" style={{
                color: tintColor
              }}/>
            }
        }
    }
})

export default createStackNavigator({
    Main: {
        screen: Main
    },
    MangaDetails: {
        screen: Screens.MangaDetails
    },
    ChapterList: {
        screen: Screens.ChapterList
    },
    Chapter: {
        screen: Screens.Chapter,
        navigationOptions: {
            header: null
        }
    }
}, {
    headerMode: 'none',
    mode: 'card'
})