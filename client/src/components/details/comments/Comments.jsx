import React, { use } from 'react'
import { Box, TextareaAutosize,Button, styled, Typography } from "@mui/material";
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';

const Container = styled(Box)`
  margin: 50px 100px;
  display: flex;
`
const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  objectFit: "cover",

});
const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  height: 100px;
  margin: 0 20px;
`
const InitialValue = {
  name: '',
  postId: '',
  comments: '',
  Date: new Date()
}

const Comments = ({ post }) => {
  const [comment, setComment] = useState(InitialValue);
  const {account} = useContext(DataContext);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const url = 'https://static.thenounproject.com/png/12017-200.png'

  const commenthandle = (e) => {
    setComment({ ...comment,
      name: account.username,
      postId: post._id,
       comments: e.target.value })
  }
  const addcomment = async () => {
    const res = await API.newComment(comment);
    if(res.isSuccess){
      setComment(InitialValue);
    }else{
      console.log('Error while adding comment');
    }
    setToggle(prev => !prev);
  }
  
  useEffect(() => {
    if (post._id) {
      const getData = async () => {
        const response = await API.getAllcomments(post._id);
        if(response.isSuccess){
          setComments(response.data);
        }else{
         console.log('Error while fetching comments'); 
        }
      }
      getData();
    }
  }, [post, toggle])
  return (
    <Box>
      <Container>
          <Image  src={url} alt="user" />
          <StyledTextarea 
            value={comment.comments}
            onChange={(e)=>commenthandle(e)}
            minRows={5}
            placeholder="Add a comment"
          
          />
          <Button onClick={()=>addcomment()} variant='contained' color="primary" size='medium' style={{height: 40}}>Post</Button>
      </Container>
      <Box>
        {
          comments && comments.length > 0 && comments.map((comment) => (
            <Comment key={comment._id} comment={comment} setToggle={setToggle} />
          ))
        }
      </Box>
    </Box>
  )
}

export default Comments
