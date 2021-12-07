import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import { StyleSheet, View, Text, Dimensions, Image, Button, ScrollView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";
import Comments from "./Comments";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.75);


const TagScreen = (props) => {
    // Hooks
    const dispatch = useDispatch();
    const isCarousel = useRef(null);

    // Redux store
    const usersTag = useSelector((state) => state.tagDetails);
    const tagScreenStatus = useSelector((state) => state.tagScreenStatus);

    // Local State
    const [commentStatus, setCommentStatus] = useState(true);

    // console.log('This is the passed tag inside TAG_SCREEN:', props.tagId);
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
                    <Text style={styles.header} >
                        Place Details:
                    </Text>
                </View>
                <Separator />
                <View>
                    <Image
                        source={{ uri: "https://i.imgur.com/7k7nFm7.png" }}
                        style={styles.image}
                    />
                    {/*This images should come from the Google API places */}
                </View>
                <Separator />
                <View>
                    <Text style={styles.tagName} >
                        {item.name}
                    </Text>
                </View>
                <Separator />
                <View style={styles.commentSection}>
                    {/* <Button
                        style={styles.body}
                        color={"rgb(31, 126, 160)"}
                        title="See Comments"
                        onPress={() => handlePressComments(item.id)}
                    /> */}
                    {
                        (commentStatus) ?
                            <Comments
                                tagId={props.tagId}
                            />
                            : "No comments yet... Perhaps I should go..."
                    }
                </View>
                <Separator />
                <View>
                    <Button
                        color={"#9B2F2F"}
                        title="Close"
                        onPress={handlePressClose}
                    />
                </View>

            </View>
        )
    }

    const handlePressClose = () => {
        dispatch(getTagScreenStatus(tagScreenStatus)); // Changes the tagView status
    }

    const handlePressComments = () => {// Will have to build an individual component to display the comments
        setCommentStatus(!commentStatus);
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
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        paddingBottom: 0,
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
        height: 125,
    },
    header: {
        color: "#222",
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
    },
    tagName: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        alignSelf: 'center',
    },
    commentSection: {
        // backgroundColor: "green",
        flex:1,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: 'black',
        borderBottomWidth: 1.5,
    },
})

export default TagScreen;
