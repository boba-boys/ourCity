import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Button, } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

const Comments = (props) => {
    const [text, setText] = useState(null);
    const [comments, setComment] = useState([])

    const user = useSelector((state) => state.users);
    console.log('---------------------Comments Screen :--------------------');

    const onSubmit = (e) => {
        // e.preventDefault();
        // Function called after the submit button is pressed
        setComment([...comments,
        <View style={styles.userProfile}>
            <Image
                source={{ uri: "https://i.imgur.com/7k7nFm7.png" }}
                style={styles.userPic}
            />

            <Text style={styles.user}>
                {/* {user.email} */}
                {text}
            </Text>
        </View>
        ])
        setText('');
    }

    return (
        <ScrollView style={styles.container}>
            {/* <Text  style={styles.user} >
                {(user.firstName)}
            </Text> */}
            <View>
                {comments.map((comment) => {
                    return (
                        <View>
                            {comment}
                        </View>
                    )
                })}
            </View>
            <View style={styles.newMessage}>
                <TextInput
                    style={styles.textBox}
                    placeholder="Write a comment"
                    onChangeText={setText}
                    value={text}
                // onSubmitEditing={onSubmit}
                />
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Add Comment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

const styles = {
    container: {
        backgroundColor: 'white',
        width: ITEM_WIDTH * 1.19,
        height: ITEM_HEIGHT,
        marginLeft: 35,
        // paddingTop:50, // This affect affects the elements inside the view
        position: 'absolute',
        // bottom: 138,
        top: -200,
        opacity: .8,
    },
    userProfile: {

    },
    userPic: {

    },
    user: {

    },
    testInput: {

    },
    newMessage: {
        bottom: 0,
        flexDirection: 'row',
        // alignItmes: 'space-between',
        // justifyContent: 'space-between'
    },
    textBox: {
        width: '70%',
        alignSelf: 'center',
        // backgroundColor:'lightgrey',
        borderColor: 'black',
        // writingDirection:true,
        height: '50%',
        margin: 12,
        borderWidth: 1,
        // padding: 10,
    },
    button: {
        backgroundColor: "#4286f4",
        padding: 3,
        marginTop: 10,
        width: '30%',
        alignSelf: 'center',
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 13,
    },
}

export default Comments;