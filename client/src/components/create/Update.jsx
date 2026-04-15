import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataContext } from "../../context/DataProvider";
import {API} from '../../service/api'

const Container = styled(Box)`
  margin: 50px 100px;
`;
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
};

const Update = () => {
 
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
      const fetchData = async() => {  
        const response =await API.getPostById(id);
        if(response.isSuccess) {
          setPost(response.data);
        } else {
          console.error('Failed to fetch post data', response);
        }
      }
      fetchData();
  }, [])

useEffect(() => {
  const getImage = async () => {
    if (file) {
      try {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);

        if (response?.isSuccess) {
          setPost((prevPost) => ({
            ...prevPost,
            picture: response.data.imageUrl,
          }));
        } else {
          console.error("Upload failed:", response.msg);
        }

      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  getImage();

  setPost((prevPost) => ({
    ...prevPost,
    categories: location.search?.split("=")[1] || "All",
    username: account?.username || prevPost.username,
  }));

}, [file, account, location.search]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
    const response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/details/${id}`);
    } else {
      console.error('Failed to update post', response);
    }
  };

  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircleIcon fontSize="large" color="action" />
        </label>
        <input 
        type="file"
         id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
           />
        <InputTextField
          placeholder="Title"
          value={post.title}
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained" onClick={()=>updateBlogPost()}>Update</Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="tell your story..."
        value={post.description}
        onChange={(e) => handleChange(e)}
        name="description"
      />
    </Container>
  );
};

export default Update;
