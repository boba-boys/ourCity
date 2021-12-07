import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Button, } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";
import { io } from "socket.io-client";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

const Comments = (props) => {
    const [comments, setComment] = useState(["First Comment", "This works!", "Hurray!!"])

    const user = useSelector((state) => state.users);

    useEffect(() => {
        console.log('---------------------ComponentDidMount Comments Screen :--------------------');
        let socket = io("http://192.168.0.27:3000");// Change this
        socket.on("comment message", msg => {
            setComment([...comments, msg]);
        });
    }, []);

    const onSubmit = (e) => {
        // e.preventDefault();
        // Function called after the submit button is pressed
        socket.emit("comment message", comments);
        setComment('');
    }

    const Separator = () => (
        <View style={styles.separator} />
    );
    const SeparatorNewMessage = () => (
        <View style={styles.separatorNewMessage} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Comment section:
            </Text>
            <ScrollView >
                {comments.map((comment) => {
                    return (
                        <View>
                            <View style={styles.userProfile}>
                                <Image
                                    source={{ uri: "https://i.imgur.com/7k7nFm7.png" }}
                                    style={styles.userPic}
                                />
                                <Separator />
                                <Text style={styles.user}>
                                    {/* {user.email} */}
                                    Hector
                                </Text>
                            </View>
                            <Text style={styles.bodyComment}>
                                {comment}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
            <SeparatorNewMessage />
            <View style={styles.newMessage}>
                <TextInput
                    style={styles.textBox}
                    placeholder="Write a comment"
                    onChangeText={setComment}
                    value={comments}
                // onSubmitEditing={onSubmit}
                />
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Add Comment</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}

const styles = {
    container: {
        // backgroundColor: 'yellow',
        flex: 1,
        // width: ITEM_WIDTH * 1.19,
        // height: "50%",
        // marginLeft: 35,
        // paddingTop:50, // This affect affects the elements inside the view
        // position: 'absolute',
        // bottom: 138,
        // top: -310,
        opacity: .9,
    },
    header: {
        color: "#222",
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
    },
    userProfile: {

    },
    userPic: {

    },
    user: {

    },
    bodyComment: {

    },
    newMessage: {
        bottom: 0,
        flexDirection: 'row',
        // width: ITEM_WIDTH,
        // alignItmes: 'flex-end',
        // justifyContent: 'space-between'
    },
    textBox: {
        flex: 4,
        // width: '75%',
        alignSelf: 'flex-end',
        // backgroundColor:'lightgrey',
        borderColor: 'black',
        // writingDirection:true,
        height: '100%',
        // margin: 5,
        borderWidth: 1,
        // padding: 10,
    },
    button: {
        flex: 1,
        backgroundColor: "#4286f4",
        // padding: 3,
        // margin: 5,
        // width: '19%',
        // height: '60%',
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: 'center',
        fontSize: 13,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    separatorNewMessage: {
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
}

export default Comments;