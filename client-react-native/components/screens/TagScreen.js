import React, { useState, useEffect } from 'react';
import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";// useSelector is mapState & useDispatch is mapDispatch

const deviceHeight = Dimensions.get("window").height

const TagScreen = (props) => {
    let [show, setShow] = useState(true);
    const { tagId, onTouchOutside, visible } = props;
    // useEffect((tagId) => {
    //     // console.log('Passing through useEffect in TagScreen.js');
    //     dispatch(getSingleTag(tagId)); // THUNK
    // }, []);

    const handleClose = () => {
        setShow(false);
    }

    const renderOutsideTouchable = (onTouch) => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view;
        return (
            <TouchableWithoutFeedback  onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <View style={styles.container}>
                {renderOutsideTouchable(onTouchOutside)}
                <Text style={styles.tagText}>
                    {props.title}
                </Text>
                {/* <View style={styles.tag}>
                </View> */}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "85%",
        height: '10%',
        marginLeft: 30,
        position: 'absolute',
        justifyContent: 'flex-start', // moves the content respective the main axis
        alignItems: "center",
        bottom: 50,
        backgroundColor: 'blue',
    },
    tag: {
        backgroundColor: 'grey',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 0.4,
        // marginTop: 100,
    },
    tagText: {
        // marginTop: 100,
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        backgroundColor: 'white',
        // bottom: 100,
    }
});

export default TagScreen;
