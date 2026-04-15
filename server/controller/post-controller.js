
import Post from '../model/post.js';                        
export const createPost = async (req, res) => {
    try {
      const newPost = new Post(req.body);
        await newPost.save();

        res.status(200).json('Post saved successfully');
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error saving post' });
    }

};

export const getAllPosts = async (req, res)=> {
    const category = req.query.category;
    let posts;
    try {
        if(category){
            posts = await Post.find({ categories : category });
        }
        else {
            posts = await Post.find({});
        }
        
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching posts' });
    }
}

export const getPostById = async (req, res) =>{
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Error fetching post' });
    }
}

export const updatePost = async(req, res)=>{
    const id = req.params.id;
    try{
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({ error: 'Post not found' });
        }
        await Post.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json('Post updated successfully');
    }catch(error){
        return res.status(500).json({ error: error.message || 'Error updating post' });
    }
}
    export const deletePost = async(req, res)=>{
        const id = req.params.id;
        try{
            const post = await Post.findById(id);
            if(!post){
                return res.status(404).json({ error: 'Post not found' });
            }
            await Post.findByIdAndDelete(id);
            return res.status(200).json('Post deleted successfully');
        }catch(error){
            return res.status(500).json({ error: error.message || 'Error deleting post' });
        }
    }