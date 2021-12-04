import React, { Component, useEffect, useState, } from "react";
import { useSelector, useDispatch, connect } from "react-redux";// useSelector is mapState & useDispatch is mapDispatch
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { getStatus } from "../../redux/carouselStatus";


export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

class CarouselCardItem extends Component {
  constructor(props) {
    super(props);
    state = {
      item: this.props.item,
      index:this.props.index,
    }
    this.handlePress = this.handlePress.bind();
  }

  componentDidMount(){
    this.props.carouselStatusThunk(false);
  }
  // const CarouselStatus = useSelector((state) => state.carouselStatus);
  // const { item, index } = props
  // const dispatch = useDispatch();
  // console.log('This is Props:',props)

  // useEffect(() => {
  //   storeData();
  // }, []);

  handlePress = () => {
    // dispatch(getStatus(CarouselStatus))
    // console.log('hi');
  }

  render() {
    return (
      <View style={styles.container} key={item.id}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
})

const mapDispatch = (dispatch) => {
  return {
    carouselStatusThunk:(state) => dispatch(getStatus(state)),
  };
};

export default connect(null, mapDispatch)(CarouselCardItem);
