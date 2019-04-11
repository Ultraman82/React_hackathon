import React, { Component } from 'react'
import { View, FlatList, Text, ScrollView, StyleSheet,
  Picker,
  Modal } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { Tile, CheckBox, Button,
  SearchBar, Slider
 } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent'
import { Flex } from '@ant-design/react-native'; 

const mapStateToProps = state => {
  return {
    joblists: state.joblists,
    comments: state.comments
  }
}

class Joblist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cook: true,
      dishwash: true,
      serve: true,
      bus: true,
      cashier: true,
      helper: true,      
      smoking: false,
      sdate: '',
      edate: '',
      minwage: 11,
      modalVisible: false,     
      distance: 0,
      notification: {}
    };
  }
  static navigationOptions = {
    title: 'Job Listing'
  }


toggleModal(visible) {
  this.setState({ modalVisible: visible });
}

handleReservation() {  
  
}

resetForm() {
  this.setState({    
    cook: true,
    dishwash: true,
    serve: true,
    bus: true,
    cashier: true,
    helper: true,      
    smoking: false,
    distance: 0,
    sdate: '',
    edate: '',
    minwage: 10,
    modalVisible: false,
  });
}


  render () {
    const { navigate } = this.props.navigation
    const renderMenuItem = ({ item, index }) => {
      return (
        <ScrollView>
          <Tile
            key={index}
            title={item.name}
            captionStyle={{
              fontSize:20
            }}
            caption={item.description + '\n' + item.type + '\n' + item.start + '\n' + item.price}
            featured
            onPress={() =>
              navigate('Dishdetail', { uId: item.uId, item: item })
            }
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </ScrollView>
      )
    }

    if (this.props.joblists.isLoading) {
      return <Loading />
    } else if (this.props.joblists.errMess) {
      return (
        <View>
          <Text>{this.props.joblists.errMess}</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Modal animationType = {"slide"} transparent = {false}
              visible = {this.state.modalVisible}              
              onRequestClose = {() => { console.log("Modal has been closed.") } }>
          
            <View>        
            <Text style={{fontSize:18, margin: 10}}>Position</Text>                      
            <CheckBox 
              left
              title='Cook'
              checked={this.state.cook}
              onPress={() => this.setState({ cook : !this.state.cook})}
            />             
            <CheckBox 
              left
              title='Dishwash'
              checked={this.state.dishwash}
              onPress={() => this.setState({dishwash: !this.state.dishwash})}
            />
            <CheckBox 
              left
              title='Serve'
              checked={this.state.serve}
              onPress={() => this.setState({serve: !this.state.serve})}
            />
            <CheckBox 
              left
              title='Bus'
              checked={this.state.bus}
              onPress={() => this.setState({bus: !this.state.bus})}
            />

            <CheckBox 
              left
              title='Cashier'
              checked={this.state.cashier}
              onPress={() => this.setState({cashier: !this.state.cashier})}
            />
            <CheckBox 
              left
              title='Helper'
              checked={this.state.helper}
              onPress={() => this.setState({helper: !this.state.helper})}
            />    
            </View>        
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Minimum Wage</Text>
            <Picker                
              selectedValue={this.state.minwage}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ minwage: itemValue })
              }>
              <Picker.Item label="11$" value="11" />
              <Picker.Item label="12$" value="12" />
              <Picker.Item label="13$" value="13" />
              <Picker.Item label="14$" value="14" />
              <Picker.Item label="15$" value="15" />
              <Picker.Item label="16$" value="16" />
            </Picker>
          </View>
         <View style={styles.formRow}>            
            <Text style={styles.formLabel}>Starting date</Text>                    
              <DatePicker                                
                  style={styles.formInput}
                  date={this.state.sdate}
                  mode="date"
                  placeholder="Starting Date"
                  format="YYYY-MM-DD"              
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }              
                }}            
                onDateChange={(date) => {this.setState({sdate: date})}}
              />                            
            </View>
          <View style={styles.formRow}>            
          <Text style={styles.formLabel}>Ending date</Text>                    
              <DatePicker              
                  style={styles.formInput}
                  date={this.state.edate}
                  mode="date"
                  placeholder="End Date"
                  format="YYYY-MM-DD"              
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }              
                }}            
                onDateChange={(date) => {this.setState({edate: date})}}
              />                            
          </View>
           <View>            
              <Text>Distance</Text> 
              <Slider                
                value={this.state.distance}
                maximumValue={100}
                onValueChange={(distance) => this.setState({distance})}
              />
              <Text>Value: {this.state.distance}</Text>
            </View>
                      
          <Button style={styles.formButton}
            onPress = {() => {this.toggleModal(false)}}          
            title="Search"
            color="#512DA8"
            accessibilityLabel="Search affirmative"
          />                   
          </Modal>       
          <Flex direction="row">  
          <Flex.Item>                   
            <SearchBar              
              lightTheme
              placeholder="Search"              
              onChangeText={(search) => this.setState({search})}
              value={this.state.search}
              />
            </Flex.Item>                   
            <Flex.Item>                   
            <Button
              raised
              onPress = {() => {this.toggleModal(true)}}
              title="Advanced Search"
              color="#512DA8"              
            /> 
            </Flex.Item>                              
          </Flex>
          <FlatList
            data={this.props.joblists.joblists}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
          />          
        </View>        
      )
    }
  }
}

const styles = StyleSheet.create({
container: {
  justifyContent: 'center',
  margin: 20,
},
modal: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#f7021a',
  padding: 100
},
text: {
  color: '#3f2949',
  marginTop: 10
},
imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20
},
image: {
  margin: 10,
  width: 80,
  height: 60
},
formInput: {
    margin: 20
},
formCheckbox: {
    margin: 20,
    backgroundColor: null
},
formButton: {
  width:40,
  height:40,
  justifyContent: 'center',
  alignItems:'center', 
  backgroundColor:'#b642f4'
},
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
  checkRow: {     
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }  
});

export default connect(mapStateToProps)(Joblist)
