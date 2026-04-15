import React from 'react'
import { Box, styled, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

const Component = styled(Box)`
  margin-top: 30px;
  background: #F5F5F5;
  padding: 10px;

`
const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`
const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`
const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
`
const StyledDeleteIcon = styled(DeleteIcon)`
  margin-left: auto;
  cursor: pointer;
`
const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const removeComment = async() => {
    const res = await API.deleteComment(comment._id);
    if (res.isSuccess) {
      setToggle(prev => !prev);
    }
  }
  return (
    <Component>
        <Container>
          <Name>{comment.name}</Name>
          <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
          {comment.name === account.username && <StyledDeleteIcon onClick={()=>removeComment()} />}
        </Container>
        <Box>
            <Typography>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}

export default Comment
