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
    const [typedComment, setTypedComment] = useState('')
    const [comments, setComment] = useState(["First Comment", "This works!", "Hurray!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!aaaaaaa Extra large commeennttntntntntntnnttn describing the whole experience at the restaurant aaaaaaaaaaaaaaaaaaaaaa"])
    
    const user = useSelector((state) => state.users);

    useEffect(() => {
        console.log('---------------------ComponentDidMount Comments Screen :--------------------');
        let socket = io("https://my-city-server.herokuapp.com/");// Change this
        socket.on("comment message", msg => {
            setComment([...comments, msg]);
        });
    }, []);

    const onSubmit = (e) => {
        // e.preventDefault();
        // Function called after the submit button is pressed
        // socket.emit("comment message", typedComment);
        let msg= typedComment;
        setComment([...comments, msg]);
        setTypedComment('');
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
            <Separator />
            <ScrollView >
                {comments.map((comment, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.commentContainer}>
                                <View style={styles.lefContainer}>
                                    <Image source={{ uri: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" }} style={styles.profilePicture} />

                                    <View style={styles.midContainer}>
                                        <Text style={styles.username}>Username</Text>
                                        <Text
                                            // numberOfLines={2}
                                            style={styles.commentBody}>
                                            {comment}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.time}>
                                    {/* {Get when the comment was created .format("DD/MM/YYYY")} */}
                                    Created at:
                                </Text>
                            </View>
                            <Separator />
                        </View>
                    )
                })}
            </ScrollView>
            <SeparatorNewMessage />
            <View style={styles.newMessage}>
                <TextInput
                    style={styles.textBox}
                    placeholder="Write a comment"
                    onChangeText={setTypedComment}
                    value={typedComment}
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
        // opacity: .9,
    },
    header: {
        color: "#222",
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
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
    commentContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        // padding: 5,
        flex:1,
        // backgroundColor:'red',
    },
    lefContainer: {
        flexDirection: 'row',
        // backgroundColor:'green',
        flex:4,
    },
    midContainer: {
        justifyContent: 'space-around',
        // backgroundColor:'yellow',
        width: '72%',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 15,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentBody: {
        fontSize: 16,
        color: 'black',
    },
    time: {
        fontSize: 14,
        color: 'grey',
        flex:1,
    },
}

export default Comments;