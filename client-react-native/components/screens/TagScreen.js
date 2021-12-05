import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image, Button } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getGroups } from "../../redux/groups";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.38);


const TagScreen = (props) => {
    // Hooks
    const dispatch = useDispatch();
    const isCarousel = useRef(null);

    // Redux store
    const usersTag = useSelector((state) => state.tagDetails);
    const tagScreenStatus = useSelector((state) => state.tagScreenStatus);

    console.log('This is the passed tag inside TAG_SCREEN:', props.tagId);
    //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.
    useEffect(() => {
        console.log('---------------------ComponentDidMount in TagScreen :--------------------')
        dispatch(getTagDetails(props.tagId)); // tagId to render
    }, []);

    const Separator = () => (
        <View style={styles.separator} />
    );

    const CarouselCardItem = ({ index, item }) => {
        return (
            <View style={styles.container} key={item.id} >
                <View>
                    {/* <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    /> This images should come from the Google API places*/}
                </View>
                <Separator />
                <View>
                    <Text style={styles.header} >
                        {item.name}
                    </Text>
                </View>
                <Separator />
                <View>
                    <Button
                        style={styles.body}
                        title="See Comments"
                        onPress={() => handlePressComments(item.id)}
                    />
                </View>
                <Separator />
                <View>
                    <Button
                        title="Close"
                        color="black"
                        onPress={handlePressClose}
                    />
                </View>
            </View>
        )
    }

    const handlePressClose = () => {
        dispatch(getTagScreenStatus(tagScreenStatus)); // Changes the tagView status
    }

    const handlePressComments = (tagId) => {// Will have to build an individual component to display the comments
        // dispatch(getStatus(CarouselStatus));
    }

    return (
        <View>
            <Carousel
                layout="tinder"
                layoutCardOffset={30}
                ref={isCarousel}
                data={usersTag}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    backgroundScreen: {
        width: "85%",
        height: '45%',
        marginLeft: 30,
        position: 'absolute',
        justifyContent: 'flex-start', // moves the content respective the main axis
        alignItems: "center",
        bottom: 50,
        backgroundColor: 'blue',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
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
        height: 150,
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
        paddingRight: 20,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

export default TagScreen;
