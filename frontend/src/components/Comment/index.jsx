import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"
import './styles.css'


export default function Comment({ data, refreshComments }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    })

    // Update the form fields as the user types
    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // close the form
        setShowEditForm(false)
        // update the comment in the backend
        updateComment(editFormData, data._id)
            .then(() => refreshComments())
    }

    // Delete a comment
    function handleDelete() {
        deleteComment(data._id)
            .then(() => refreshComments())
    }


    //  Default JSX of each comment
    let commentElement = <div
    
        className="commentElement">
     <div className="reviewsContainer">
        <p className="commentName"><p className="nameReview">Name: <br /> </p>{data.name}</p>
        <p className="commentContent"><p className="reviewReview">Review: <br /> </p>{data.content}</p>
        <div className="formButton">
            <button
                onClick={() => { setShowEditForm(true) }}
                className="editButton">
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="deleteButton">
                Delete
            </button>
            </div>
        </div>
    </div>

    // Change the comment to a form if the showEditForm state variable is true
    if (showEditForm) {
        commentElement = <form
            onSubmit={handleSubmit}
            className="showEditForm">
            <input
                name="name"
                className="editNameInput"
                placeholder="Your name"
                value={editFormData.name}
                onChange={handleInputChange}
            />
            <br />
            <textarea
                name="content"
                className="editContentInput"
                placeholder="Share your thoughts!"
                value={editFormData.content}
                onChange={handleInputChange}
            />
            <div>
                <button
                    onClick={() => { setShowEditForm(false) }}
                    className="setShowEditForm">
                    Close
                </button>
                <button
                    type="submit"
                    className="setShowPostForm">
                    Post
                </button>
            </div>
        </form>
    }

    return commentElement
}