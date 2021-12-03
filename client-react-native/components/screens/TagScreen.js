import React, { useState } from 'react';
import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
const deviceHeight = Dimensions.get("window").height

const TagScreen = (props) => {
    // let [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const renderOutsideTouchable = (onTouch) => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view;
        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal
            transparent={true}
            visible={props.visible}
            onRequestClose={handleClose}
        >
            <View style={styles.container}>
                {/* {renderOutsideTouchable(props.onTouchOutside)} */}
                <View style={styles.tag}>
                    <View>
                        <Text style={styles.tagText}>
                            {props.title}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = {
    container: {
        // flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'flex-end',
    },
    tag: {
        backgroundColor: 'grey',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 0.4,
    },
    tagText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        margin: 15,
    }
}

export default TagScreen;
