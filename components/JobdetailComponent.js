import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { JOBLISTS } from '../shared/joblists';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications } from 'expo';

//console.log("Jobdetail is Called : " + this.props.uId); 
const mapDispatchToProps = dispatch => ({
  postComment: (uId, author, rating, comment) =>
  dispatch(postComment(uId, author, rating, comment))  
});

const mapStateToProps = state => {
  return {
    joblists: state.joblist,
    comments: state.comments    
  };
};

function RenderDish(props) {
  const joblist = props.joblist;    
  
const shareDish = (title, message, url) => {
  Share.share({
      title: title,
      message: title + ': ' + message + ' ' + url,
      url: url
  },{
      dialogTitle: 'Share ' + title
  })
}

if (joblist != null) {
    return(
        <ScrollView>
        <Card featuredTitle={joblist.name} image={{ uri: baseUrl + joblist.image }}>
        <Text style={{ margin: 10 }}>Job description: {joblist.description}</Text>
        <Text style={{ margin: 10 }}>Date/Time : {joblist.start}</Text>
        <Text style={{ margin: 10 }}>Hours : {joblist.hours}</Text>
        <Text style={{ margin: 10 }}>Hourly Wage: {joblist.price}</Text>
        <Text style={{ margin: 10 }}>Address: {joblist.address}</Text>
        <View style= {styles.formRow}>          
          <Icon
            raised            
            reverse
            name={'pencil'}
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.toggleModal()}
          />
          <Icon
            raised            
            reverse
            name='share'
            type="font-awesome"
            color="#51D2AA"
            onPress={() => shareDish(joblist.name, joblist.description, baseUrl + joblist.image)}
          />
          <Icon
            raised            
            reverse
            name={'envelope'}
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.handlePush()}
          />          
        </View>
        
          <Button style={styles.formButton} 
            color="#512DA8"
            title="Apply"
           />
        
        </Card>
      </ScrollView>            
    );
  } else {
    return <View />;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 12 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>        
        <Rating          
          style = {{marginRight: 'auto'}}
          imageSize={10}
          readonly
          startingValue={item.rating}          
        />
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>    
    </Animatable.View>    
  );
}

class Jobdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joblists: JOBLISTS,
      comments: COMMENTS,
      showModal: false,      
      feedback: "",
      author: "",
      rating: 3
    };  
  }  

  static navigationOptions = {
    title: 'Job Details',
  };
  
  handlePush() {
        this.presentLocalNotification("test");
/*         this.registerForPushNotificationsAsync(); */
  }
/*   async registerForPushNotificationsAsync() {
    console.log("registerForPushNotificationsAsync() has started");
    const aa = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    console.log("statu + ts " + JSON.stringify(aa));
    try {
      let token = await Notifications.getExpoPushTokenAsync();
      console.log("token : " + token);
      return token;
    } catch (err) {
      alert("Error", err)
      console.log("Error", err);
    }
  } */

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Paermissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }
    return permission;
}

async presentLocalNotification(date) {
      
    await this.obtainNotificationPermission(); 
        
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for '+ date + ' requested',
      ios: {
          sound: true
      },
      android: {
          sound: true,
          vibrate: true,
          color: '#512DA8'
      }
  });
}


  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  
  handleFeedback(uId) {
    this.props.postComment(uId, this.state.author, this.state.rating, this.state.feedback);
    console.log('HandleFeedbak values: ' + JSON.stringify(this.state));    
    this.setState({ showModal: !this.state.showModal });
  }  
  
  resetFeedback() {
    this.setState({
      feedback: "",
      author: "",
      rating: 3      
    });    
  }
    

  render() {
    const uId = this.props.navigation.getParam('uId', '');
    const joblist = this.props.navigation.getParam('item', '');
    console.log("Jobdetail is working : " + uId + joblist);    
    return (
      <ScrollView>        
        <RenderDish
          joblist = {joblist}                    
          handleFeedback={() => this.handleFeedback(uId)}
          handlePush={() => this.handlePush()}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.uId === uId
          )}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}>
          <View style={styles.modal}>            
            <Rating              
                ratingCount={5}
                imageSize={50}
                showRating
                onFinishRating={(e) => this.setState({ rating : e})}                
              />
              <Input
                placeholder='Author'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(author) => this.setState({author})}                
              />
              <Input
                placeholder='Feedback'
                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                onChangeText={(feedback) => this.setState({feedback})}
              /><Text>{'\n'}</Text>
              <Button
                onPress={() => {
                  this.handleFeedback(uId);                   
                }}
                color="#512DA8"
                title="Submit"
              /><Text>{'\n'}</Text>
              <Button
                onPress={() => {                  
                  this.resetFeedback();
                  this.toggleModal();                  
                }}
                color="#A9A9A9"
                title="Cancel"
              />   
          </View>
        </Modal>
        
    

      </ScrollView>
    );
  }   
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  formButton: {
    width:120,
    height:50,
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor:'#b642f4'
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Jobdetail);
