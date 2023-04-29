import { useState, useEffect } from "react"
import { postComment, getComments } from "../../../utils/backend"
import Comment from "../Comment"
import './styles.css';


export default function commentSection({ movieId }) {
    // Save comments queried from the database in state
    const [comments, setComments] = useState([])
    console.log('Movie ID:', movieId);
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: '', movieId: movieId
    })

    // Query the database for all comments that pertain to this movie
    useEffect(() => {
        getComments(movieId)
          .then(comments => {
            console.log("Tristans Comments: ", comments);
            setComments(comments);
          });
          console.log("Here are the comments: ", comments);
      }, [movieId]);


    // Update the form fields as the user types
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Render a form that allows a user to create a comment on submit
    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

       // Update the comments in the comment section after a database sees new comment
    //    function refreshComments() {
    //     getComments(movieId)
    //         .then(newCommentData => setComments(newCommentData))
    //         .catch(error => console.error(error));
    // }

    // Update the comments in the comment section after a database transaction
    function refreshComments() {
        getComments(movieId)
            .then(newCommentData => setComments(newCommentData))
    }
    console.log("Steven", comments)

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // clear the form
        setCreateFormData({
            name: '',
            content: ''
        })
        // close the form
        setShowCreateForm(false)
        // create the comment in the backend
        postComment({ ...createFormData, movieId: movieId })
            .then(() => refreshComments())
    }


    // conditionally render comments
    let commentElements = (
        <p key="0" className="text-center">
          No comments yet. Be the first to comment!
        </p>
      );
      if (comments.length > 0) {
        // console.log(comments)
        commentElements = comments.map((comment) => (
          <Comment key={comment._id} data={comment} refreshComments={refreshComments} />
        ));
      }

      
    // conditionally display the text of the create form button
    let btnText = 'Create'
    if (showCreateForm) {
        btnText = 'Close'
    }

    return (
        <div className='viewer-reviews-section'>
            <h2 className='viewer-reviews'>Viewer Reviews</h2>
            <button
                onClick={toggleCreateForm}
                className="createFormButton"
            >
                {btnText}
            </button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="showFormButton">
                    <input
                        name="name"
                        className="handleInput"
                        placeholder="Name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        className="handleInputChange"
                        placeholder="How was the movie?"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="postButton">
                        Post
                    </button>
                </form>
            }
            {commentElements}
        </div>
    )
}