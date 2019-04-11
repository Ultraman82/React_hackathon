import React, { Component } from 'react';
import Joblist from './JoblistComponent';
import Dishdetail from './DishdetailComponent';
import Login from './LoginComponent';
import Apply from './ApplyComponent';
import {
  Notifications,
} from 'expo';

import { View, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {  
  fetchComments,  
  fetchJoblists
} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    comments: state.comments,    
    joblists: state.joblists
  };
};

const mapDispatchToProps = dispatch => ({    
  fetchComments: () => dispatch(fetchComments()),    
  fetchJoblists: () => dispatch(fetchJoblists())
});

const JoblistNavigator = createStackNavigator(
  {
    Joblist: {
      screen: Joblist,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    Dishdetail: { screen: Dishdetail },
  },
  {
    initialRouteName: 'Joblist',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
    },
  }
);

const LoginNavigator = createStackNavigator({
  Login: Login
}, {
navigationOptions: ({ navigation }) => ({
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  title: 'Login',
  headerTintColor: "#fff",
  headerLeft: <Icon name="menu" size={24}
    iconStyle={{ color: 'white' }} 
    onPress={ () => navigation.toggleDrawer() } />    
})
});

const ApplyNavigator = createStackNavigator({
  Apply: Apply
}, {
navigationOptions: ({ navigation }) => ({
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  title: 'Apply',
  headerTintColor: "#fff",
  headerLeft: <Icon name="menu" size={24}
    iconStyle={{ color: 'white' }} 
    onPress={ () => navigation.toggleDrawer() } />    
})
});


const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('./images/logo.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Workeen</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        title: 'Login',
        drawerLabel: 'Login',
        drawerIcon: ({ trackColor, focused }) => (
          <Icon name="sign-in" type="font-awesome" size={24} color={trackColor} />
        ),
      },
    },

    Joblist: {
      screen: JoblistNavigator,
      navigationOptions: {
        title: 'Find Job',
        drawerLabel: 'Find Job',
        drawerIcon: ({ trackColor, focused }) => (
          <Icon name="list" type="font-awesome" size={24} color={trackColor} />
        ),
      },
    },
    Apply: {
      screen: ApplyNavigator,
      navigationOptions: {
        title: 'Apply',
        drawerLabel: 'Apply',
        drawerIcon: ({ trackColor, focused }) => (
          <Icon name="sign-in" type="font-awesome" size={24} color={trackColor} />
        ),
      },
    },
  },  
  {
    initialRouteName: 'Joblist',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent,
  }
);

class Main extends Component {
  state = {
    notification: {}
  };  

  componentDidMount() {        
    this.props.fetchComments();        
    this.props.fetchJoblists();    
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
    _handleNotification = (notification) => {
    this.setState({ notification: notification });
    console.log("notification : " + JSON.stringify(notification));  
  }

  render() {
    if (this.state.notification.origin !== "selected")
    {
      console.log("IF initial notification" +  JSON.stringify(this.state.notification));
      return (
        <View
          style={{
            flex: 1     
          }}>
          <MainNavigator />
        </View>
      );      
    }
    else{
      console.log("Else is working");                  
      return (
        <View
          style={{
            flex: 1     
          }}>
          <Apply data={this.state.notification.data}/>
        </View>
      ); 
    }
       /* return(
        <View
          style={{
            flex: 1     
          }}>
          <MainNavigator />
        </View>
      ); */
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
