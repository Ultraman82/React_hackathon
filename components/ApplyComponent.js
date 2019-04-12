import React, { Component } from 'react';
import { View, Modal, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon, Card } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

const imageName = require("./images/42logo.png");

const baseUrl = "http://www.mapquestapi.com/geocoding/v1/address?key=VtVVSZ98vXO6vWYRj1fza9QhHqEgySJ6&inFormat=kvp&outFormat=json&location="

function RenderMarker(props) {
    console.log("props in RenderMarker:" + JSON.stringify(props));
        return (
        <MapView.Marker
            coordinate={{latitude: props.address.lat,
            longitude: props.address.lng}}
            title={props.address.title}
            description={props.address.description}
        />
        );
    }  

class Apply extends Component {    
    constructor(props) {
        super(props)
        this.state = {            
            showModal: false,
            lat: 0,
            lng: 0,
            title: props.data.b_name,
            description: props.data.title,
            address: props.data.b_address.b_address_1
        };        
    }           
    componentDidMount() {        
        const address = this.state.address.replace(/\s/g, "+");   
        fetch(baseUrl + address +"&thumbMaps=true")
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          error => {
                var errmess = new Error(error.message);
                throw errmess;
          })
        .then(response => response.json())
        .then(data => {
            console.log("lat int data" + data.results[0].locations[0].latLng.lat);
            this.setState({
            lat: data.results[0].locations[0].latLng.lat,
            lng: data.results[0].locations[0].latLng.lng,
        })}
    )        
    } 
    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
        console.log("state in toggle: " + JSON.stringify(this.state));
    }

      
    render(){
        const joblist = this.props.data;
        
        return(            
            <ScrollView>                
                <View style={{marginTop:40}}>
                <Card title={joblist.b_name}>
                <Text style={styles.modalTitle}>{joblist.b_detail}</Text>
                <Text style={styles.modalText}>Position: {joblist.position}</Text>
                <Text style={styles.modalText}>Starting Date/Time : {joblist.fromdate}, {joblist.fromtime} </Text>
                <Text style={styles.modalText}>Ending Date/Time : {joblist.todate}, {joblist.totime} </Text>                
                <Text style={styles.modalText}>Hourly Wage: {joblist.wage}</Text>
                <Text style={styles.modalText}>Address: {joblist.b_address.b_address_1}</Text>
                <View style={styles.formRow}>          
                <Icon
                    raised            
                    reverse
                    name={'map'}
                    type="font-awesome"
                    color="#512DA8"                    
                    onPress={() => this.toggleModal()}                 
                />
                <Icon
                    raised            
                    reverse
                    name='share'
                    type="font-awesome"
                    color="#51D2AA"                    
                />
                <Icon
                    raised            
                    reverse
                    name={'envelope'}
                    type="font-awesome"
                    color="#b642f4"                    
                />          
                </View>                
                <Button style={styles.formButton} 
//                    color="#512DA8"
                    title="Apply"
                />                
                </Card>                
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                    > 
                <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 37.548592,
                    longitude: -122.058594,
                    latitudeDelta: 0.0500,
                    longitudeDelta: 0.0500,                    
                    }}
                    showsUserLocation={true}
                >
                <MapView.Marker
                    //image={imageName}
                    coordinate={{latitude: 37.548592,
                    longitude: -122.058594}}
                    title={"42 School Silicon valley"}
                    description={"Our lovely school & home"}
                >
                <Image
                    source={imageName} 
                    style={{
                        width:60,
                        height:45
                    }}
                />
                </MapView.Marker>
                <RenderMarker address={this.state}/>
                </MapView>
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
      margin: 60,
    },
    formLabel: {
      fontSize: 18,
      flex: 2,
    },
    formItem: {
      flex: 1,
    },
    formButton: {        
    position: 'absolute',
    bottom:0,
    width:120,
    height:50,      
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
      textAlign: 'center',
      color: '#512DA8',
      marginBottom: 20,
    },
    modalText: {
      fontSize: 18,
      margin: 10,
    },
    container: {
    justifyContent: 'center',
    margin: 20,
    },
    map: {
        position: 'absolute',
        top: 0,
        width:400,
        height:650,
        left: 0,
        right: 0,
        bottom: 0,
      }   
  });


export default Apply;