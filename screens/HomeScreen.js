import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList, ActivityIndicator,
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {

    var d = new Date();

    let dateToday = d.toISOString().split('T')[0];
    let idDriver = 1;

    super(props);
    this.state = {
      isLoading: false,
      order: [],
      url: 'http://192.168.0.4:3000/api/tbl_orders?filter={"where":{"and":[{"idDriver":' + idDriver + '},{"dateDelivery":"' + dateToday + '"}]}}',
    }
  }

  componentDidMount() {
    this.getOrders();
  }


  getOrders = () => {
    this.setState({ isLoading: true })
    fetch(this.state.url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          order: res,
          isLoading: false
        })
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });


  }

  // render(){

  //   if(this.state.isLoading){
  //     return(
  //       <View style={{flex: 1, padding: 20}}>
  //         <ActivityIndicator/>
  //         <Text>Descargando Listado</Text>
  //       </View>
  //     );
  //   }

  //   return(

  //       <View style={{flex: 1, padding: 20}}>
  //         <Text>Listado Pedidos</Text>
  //         <FlatList 
  //           data={this.state.order}
  //           renderItem={
  //             ({item}) => <Text>{ item.idClient }</Text>
  //           }
  //           keyExtractor={(item, index) => index.toString()}
  //         />
  //       </View>
  //   );
  // }


  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Pedidos Hoy</Text>
            <View >
              <FlatList
                data={this.state.order}
                renderItem={
                  ({ item }) => <Text style={styles.delivery}>ID: 000{item.idOrder}, Dirección: {item.idAddress}, Client: {item.idClient}, Franja entrega: {item.startHour} - {item.finalHour}</Text>
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ScrollView>
 
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Mensajero</Text>
          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>Eduardo Zanabria</MonoText>
          </View> 
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  delivery: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '100%',
    marginTop: 20,
    padding: 20,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
