import Comment from "../model/comment.js";


export const newComment = async (req, res) => {
    try{
       const comment = new Comment(req.body);
         await comment.save();
         return res.status(200).json({message: 'Comment added successfully'});

    }catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const getAllComments = async (req, res) => {
    try {
        const postId =  req.params.id;
        const comments = await Comment.find({postId: postId});
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const deleteComment = async (req, res)=> {
    const commentId = req.params.id;
    try {
        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({message: 'Comment deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}