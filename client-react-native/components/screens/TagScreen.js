import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getGroups } from "../../redux/groups";
import { getStatus } from "../../redux/carouselStatus";
import { getTags } from "../../redux/tags";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.38);

const FirstTagScreen = (props) => {
    // let [show, setShow] = useState(true);
    // const { tagId, onTouchOutside, visible } = props;

    // useEffect((tagId) => {
    //     // console.log('Passing through useEffect in TagScreen.js');
    //     dispatch(getSingleTag(tagId)); // THUNK
    // }, []);

    // const handleClose = () => {
    //     setShow(false);
    // }

    // const renderOutsideTouchable = (onTouch) => {
    //     const view = <View style={{ flex: 1, width: '100%' }} />
    //     if (!onTouch) return view;
    //     return (
    //         <TouchableWithoutFeedback  onPress={onTouch} style={{ flex: 1, width: '100%' }}>
    //             {view}
    //         </TouchableWithoutFeedback>
    //     )
    // }
    const isCarousel = useRef(null);
    const userTags = useSelector((state) => state.tags);
    const dispatch = useDispatch();

    //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.

    useEffect((userId) => {
        dispatch(getGroups(1));
    }, []);

    return (
        // <Modal
        //     transparent={true}
        //     visible={visible}
        // >
        //     <View style={styles.container}>
        //         {renderOutsideTouchable(onTouchOutside)}
        //         <Text style={styles.tagText}>
        //             {props.title}
        //         </Text>
        //         {/* <View style={styles.tag}>
        //         </View> */}
        //     </View>
        // </Modal>
        <View style={styles.container}>
            {/* <Carousel
                layout="tinder"
                layoutCardOffset={30}
                ref={isCarousel}
                data={userTags}
                renderItem={}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            /> */}
        </View>
    )
}

const FirstTagScreenStyles = StyleSheet.create({
    //     container: {
    //         width: "85%",
    //         height: '10%',
    //         marginLeft: 30,
    //         position: 'absolute',
    //         justifyContent: 'flex-start', // moves the content respective the main axis
    //         alignItems: "center",
    //         bottom: 50,
    //         backgroundColor: 'blue',
    //     },
    //     tag: {
    //         backgroundColor: 'grey',
    //         width: '100%',
    //         borderTopRightRadius: 10,
    //         borderTopLeftRadius: 10,
    //         paddingHorizontal: 10,
    //         // maxHeight: deviceHeight * 0.4,
    //         // marginTop: 100,
    //     },
    //     tagText: {
    //         // marginTop: 100,
    //         color: 'black',
    //         fontSize: 20,
    //         fontWeight: '500',
    //         backgroundColor: 'white',
    //         // bottom: 100,
    //     }
});


const TagScreen = (props) => {
    const isCarousel = useRef(null);
    const usersTag = useSelector((state) => state.tagDetails);
    const dispatch = useDispatch();

    //below is a hook called useEffect (similar to component did mount) that gets called when the component initially renders.
    useEffect(() => {
        console.log('---------------------ComponentDidMount:--------------------')
        dispatch(getTagDetails(props.tagId)); // tagId to render
    }, []);

    const Separator = () => (
        <View style={styles.separator} />
    );

    const CarouselCardItem = ({ index, item }) => {
        return (
            <View style={styles.container} key={item.id} >
                {/* <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                /> This images should come from the Google API places*/}
                <Separator />
                <Text style={styles.header} >
                    {item.name}
                </Text>
                <Separator />
                <Button
                    style={styles.body}
                    title="See Comments"
                    onPress={() => handlePressComments(item.id)}
                />
                <Separator />
                <Button
                    title="Close"
                    color="#f194ff"
                    onPress={() => handlePressClose()}
                />
            </View>
        )
    }

    const handlePressClose = () => {
        // dispatch(getStatus(CarouselStatus)); // Changes the tagView status
    }

    const handlePressComments = (tagId) => {// Will have to build an individual component to display the comments
        // dispatch(getStatus(CarouselStatus));
    }

    return (
        <View /* style={styles.container} */>
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
        bottom: 5,
        position: 'absolute',
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
