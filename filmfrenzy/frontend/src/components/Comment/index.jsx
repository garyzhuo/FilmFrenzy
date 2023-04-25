import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"

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
        className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
        <p className="font-bold">{data.name}</p>
        <p className="my-2">{data.content}</p>
        <div className="flex justify-end">
            <button
                onClick={() => { setShowEditForm(true) }}
                className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
        </div>
    </div>

    // Change the comment to a form if the showEditForm state variable is true
    if (showEditForm) {
        commentElement = <form
            onSubmit={handleSubmit}
            className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
            <input
                name="name"
                className="px-2 py-1 w-full bg-gray-100"
                placeholder="Your name"
                value={editFormData.name}
                onChange={handleInputChange}
            />
            <br />
            <textarea
                name="content"
                className="p-2 my-2 h-[100px] w-full bg-gray-100"
                placeholder="Share your thoughts!"
                value={editFormData.content}
                onChange={handleInputChange}
            />
            <div>
                <button
                    onClick={() => { setShowEditForm(false) }}
                    className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                    Close
                </button>
                <button
                    type="submit"
                    className="text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2">
                    Post
                </button>
            </div>
        </form>
    }

    return commentElement
}