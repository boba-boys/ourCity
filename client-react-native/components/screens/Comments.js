import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is mapState & useDispatch is mapDispatch
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { getTagDetails } from "../../redux/tagDetails";
import { getTagScreenStatus } from "../../redux/tagScreenStatus";
import { io } from "socket.io-client";
import axios from "axios";
import { getComments } from "../../redux/allComments";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

const Comments = (props) => {
  // Global State
  const groupId = useSelector((state) => state.setGroupIdOnState);
  const user = useSelector((state) => state.users);
  const comments = useSelector((state) => state.allComments);

  // Local State
  const [typedComment, setTypedComment] = useState("");
  const tagId = props.tagId;

  const dispatch = useDispatch();

  // console.log("Comments from the global store in CommentScreen", comments);

  useEffect(() => {
    dispatch(getComments({ tagId, groupId }));
    // console.log("getComments right after axios", comments);
  }, []);

  const onSubmit = async () => {
    // e.preventDefault();
    await axios.post(
      `https://my-city-server.herokuapp.com/api/tags/comments/${tagId}/${groupId}`,
      {
        description: typedComment,
        userId: user.id,
      }
    );
    dispatch(getComments({ tagId, groupId }));
    // // Function called after the submit button is pressed
    // socket.emit("comment message", typedComment);
    // let msg = typedComment;
    // setComment([...comments, msg]);
    setTypedComment("");
    console.log(comments)
  };

  const Separator = () => <View style={styles.separator} />;
  const SeparatorNewMessage = () => <View style={styles.separatorNewMessage} />;

  const handleDelete = async (commentId) => {
    //Just need to set ID of comment to be deleted
    // console.log("comment id to be deleted", commentId);
    await axios.delete(
      `https://my-city-server.herokuapp.com/api/users/comment/${commentId}`
    );
    dispatch(getComments({ tagId, groupId }));
    // const getComments = await axios.get(
    //   `https://my-city-server.herokuapp.com/api/tags/comments/${tagId}/${groupId}`
    // );
    // const refinedComments = getComments.data.map((comment) => {
    //   comment.userId ? comment : null;
    // });
    // setComments(getComments.data);
    alert("Comment deleted");
  };

  return (
    <View style={styles.container}>
      <Separator />

      <View style={styles.newMessage}>
        <TextInput
          style={styles.textBox}
          placeholder='Write a comment'
          onChangeText={setTypedComment}
          value={typedComment}
        // onSubmitEditing={onSubmit}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {comments.map((comment, index) => {
          // console.log('Comment inside map function in Comment:', comment)
          if (comment.body != 'new Tag') {
            return(
              <View key={index}>
                <View style={styles.commentContainer}>
                  <View style={styles.lefContainer}>
                    <Image
                      source={{
                        uri: comment.userPic,
                      }}
                      style={styles.profilePicture}
                    />

                    <View style={styles.midContainer}>
                      <Text style={styles.username}>{comment.userWhoCommented}</Text>
                      <Text
                        // numberOfLines={2}
                        style={styles.commentBody}
                      >
                        {comment.body}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={styles.time}>
                      {(comment.createdAt)}
                    </Text>
                    {(user.id === comment.userIdWhoCommented) ? (
                      <Text
                        style={{ color: "red" }}
                        onPress={() => handleDelete(comment.id)}
                      >
                        Delete
                      </Text>
                    ) : null}
                  </View>
                </View>
                <Separator />
              </View>
            )
          }
        })}
      </ScrollView>
      <SeparatorNewMessage />

    </View>
  );
};

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
    alignSelf: "center",
    fontWeight: "bold",
  },
  newMessage: {
    bottom: 0,
    flexDirection: "row",
  },
  textBox: {
    flex: 4,
    // width: '75%',
    alignSelf: "flex-end",
    // backgroundColor:'lightgrey',
    borderColor: "black",
    height: "100%",
    // margin: 5,
    borderWidth: 1,
    // padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#4286f4",
    alignSelf: "flex-end",
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 12,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorNewMessage: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  commentContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flex: 1,
    // backgroundColor:'red',
  },
  lefContainer: {
    flexDirection: "row",
    // backgroundColor:'green',
    flex: 4,
  },
  midContainer: {
    justifyContent: "space-around",
    // backgroundColor:'yellow',
    width: "72%",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  commentBody: {
    fontSize: 16,
    color: "black",
  },
  rightContainer: {
    flex: 1,
  },
  time: {
    fontSize: 14,
    color: "grey",
    flex: 1,
  },
};

export default Comments;
