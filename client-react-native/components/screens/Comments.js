import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ScrollView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";

// const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
// const SLIDER_HEIGHT = Dimensions.get('window').height;
// const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

const Comments = (props) => {
    const [text, setText] = useState('');
    const [comment, setComment] = useState([])

    const user = useSelector((state) => state.user);
    console.log('---------------------Comments :--------------------')
    const onSubmit = () => {
        // Function called after the submit button is pressed
        <View style={styles.userProfile}>
            <Image
                source={{ uri: "https://i.imgur.com/7k7nFm7.png" }}
                style={styles.userPic}
            />

            <Text style={styles.user}>
                {user}
            </Text>
        </View>
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.newMessage}>
                <TextInput
                    style={styles.textBox}
                    placeholder="Send a message"
                    onChangText={setText}
                    onSubmitEditing={onSubmit}
                />
            </View>
            {comment}
        </ScrollView>

    )
}

const styles = {
    container: {
        flex: 1,
    },
    userProfiel: {

    },
    userPic: {

    },
    user: {

    },
    testInput: {

    },
    newMessage: {
        bottom: 0,
    },
    textBox: {

    },
}

export default Comments;