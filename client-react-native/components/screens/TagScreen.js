import React, { useState } from 'react';
import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';

const TagScreen = (props) => {
    let [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <Modal
            transparent={true}
            visible={handleShow}
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1, backgroundColor: 'grey', justifyContent: 'flex-end' }}>
            
            </View>
        </Modal>
    )
}

export default TagScreen;
