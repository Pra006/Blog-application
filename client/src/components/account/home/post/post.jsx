import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { addElipsis } from '../../../../utils/common-utils';


const Container = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled('img')({
  width: '100%',
  height: 180,
  objectFit: 'cover',
});

const Content = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

const Category = styled(Typography)`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  color: #222;
  line-height: 1.3;
`;

const Username = styled(Typography)`
  font-size: 13px;
  color: #555;
`;

const Description = styled(Typography)`
  font-size: 14px;
  color: #444;
  line-height: 1.5;
`;

const Post = ({ post }) => {
  return (
    <Container>
      {post.picture && (
        <Image src={post.picture} alt="blog" />
      )}

      <Content>
        <Category>{post.categories}</Category>
        <Title>{addElipsis(post.title, 50)}</Title>
        <Username>By {post.username}</Username>
        <Description>
          {addElipsis(post.description, 100)}
        </Description>
      </Content>
    </Container>
  );
};

export default Post;