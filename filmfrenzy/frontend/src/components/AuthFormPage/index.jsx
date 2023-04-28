import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend"
import './styles.css'
import '../../index.css'


export default function AuthFormPage() {
    const { formType } = useParams()
    const navigate = useNavigate();

    // Execute auth logic on form submit
async function handleSubmit(event) {
    // prevent the page from refreshing when the form is submitted
    event.preventDefault()
    // check what the URL parameter is to determine what request to make
    if (formType === 'login') {
        const { token } = await logIn(formData)
        localStorage.setItem('userToken', token)
    } else {
        const { token } = await signUp(formData)
        localStorage.setItem('userToken', token)
    }
    // redirect to the home page after signing/logging in
    navigate('/')
}

    let actionText
    formType === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div className="authPage">
            <div className="authPageContainer">
                <h2 className="actionText">{actionText}</h2>
                <form className="submitButton" onSubmit={handleSubmit}>
                    
                    <div>
                        <label className="emailPlaceHolder" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="emailInput"
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="passwordPlaceHolder" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="passwordInput"
                            id="password"
                            name="password"
                            type="password"
                            minLength="6"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="submit-class"> 
                        <button
                            type="submit"
                            className="submit-button">
                            {actionText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}



