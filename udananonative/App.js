import React from 'react'
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import viewDecks from './components/viewDecks'
import viewOneDeck from './components/viewOneDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { deepBlue, middleBlue, beige, beigePlus, beigeRed, red, purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail'
import { getDecks2 } from './utils/_api'

const UdaciStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: viewDecks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      // tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'ADD DECK',
      // tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? deepBlue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : deepBlue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    labelStyle: {
      fontSize: 22,
    },
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  AddEntry: {
    screen: viewOneDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      },
    // header: null
    // tabBarLabel: 'NEW DECK',
      // tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      }
    }
  }
})

export default class App extends React.Component {
  state = {
    ready: false,
  }
  componentDidMount() {

  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={deepBlue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decks: {
    borderColor: red,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    borderLeftColor: middleBlue,
    borderLeftWidth: 15,
    backgroundColor: '#FDFDFD'
  },
})

