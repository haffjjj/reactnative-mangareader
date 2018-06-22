import {createStackNavigator} from 'react-navigation'
import * as Screens from './app/screens/'

export default createStackNavigator({
    Main: {
        screen: Screens.Main
    },
    Chapter: {
        screen: Screens.Chapter
    },
    ChapterList: {
        screen: Screens.ChapterList
    },
    MangaDetails: {
        screen: Screens.MangaDetails
    }
}, {headerMode: 'none'})