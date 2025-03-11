import { useEffect, useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { signUpUser } from "./api/apiService";
import './assets/styles/SignUp.css';

interface SignUpProps {
    imageSource: string;
    animationSource: string;
    setHertaFace: React.Dispatch<React.SetStateAction<string>>;
    setHertaAction: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUp({ imageSource, animationSource, setHertaFace, setHertaAction }: SignUpProps) {
    const strPath = "/src/assets/icons/";
    const [showPassword, setShowPassword] = useState(false);

    const copyEmailFrame = useRef(0);
    const copyPasswordFrame = useRef(0);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [usernameField, setUsernameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [passwordConfirmationField, setPasswordConfirmationField] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>(""); // New state for error message

    const [lastInputTime, setLastInputTime] = useState<number>(500);

    function handleText(event: ChangeEvent<HTMLInputElement>) {
        const { type, id, value } = event.target;

        if (id === "username") {
            setUsernameField(value);
        } else if (type === "email") {
            setLastInputTime(Date.now());
            setEmailField(value);
            setHertaFace(strPath + "HertaSpying.png");
            setHertaAction(strPath + `WritingHerta${copyEmailFrame.current + 1}.png`);
            copyEmailFrame.current = (copyEmailFrame.current + 1) % 9;
        } else if (id === "password") {
            setPasswordField(value);
            if (showPassword) {
                setLastInputTime(Date.now());
                setHertaFace(strPath + "HertaSpying.png");
                setHertaAction(strPath + `WritingHerta${copyPasswordFrame.current + 1}.png`);
            }
            copyPasswordFrame.current = (copyPasswordFrame.current + 1) % 9;
        } else if (id === "passwordConfirmation") {
            setPasswordConfirmationField(value);
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (passwordField !== passwordConfirmationField) {
            setErrorMessage("Passwords do not match!");
            return;
        } else if (passwordField.length < 12) {
            setErrorMessage("Password must be atleast (10) characters long!")
        } else {
            setErrorMessage("");
        }

        const userData = {
            username: usernameField,
            email: emailField,
            password: passwordField,
            password2: passwordConfirmationField
        };

        signUpUser(userData)
            .then((data) => {
                console.log('User created successfully', data);
            })
            .catch((error) => {
                console.error('Failed to create user', error);
            });
    }

    function togglePasswordVisibility() {
        setShowPassword(prevState => !prevState);
        setIsPasswordVisible(prevState => !prevState);
    }

    // Timer for last input activity
    useEffect(() => {
        const interval = setInterval(() => {
            const timeElapsed = Date.now() - lastInputTime;
            if (timeElapsed >= 800 && !showPassword) {
                if (imageSource === strPath + "HertaSpying.png") {
                    setHertaAction(strPath + "HertaThinking1.png");
                }
                setHertaFace(strPath + "HertaStealthing.png");
            }
        }, 800);

        return () => clearInterval(interval);
    }, [lastInputTime, emailField, passwordField, strPath, imageSource]);

    // Idle animation logic
    useEffect(() => {
        const interval = setInterval(() => {
            const timeElapsed = Date.now();
            if (timeElapsed >= 500 && (timeElapsed - lastInputTime) >= 500) {
                const lastChar = animationSource[animationSource.length - 5];
                if (lastChar === "1") {
                    setHertaAction(strPath + "HertaThinking2.png");
                } else if (lastChar === "2") {
                    setHertaAction(strPath + "HertaThinking3.png");
                } else {
                    setHertaAction(strPath + "HertaThinking1.png");
                }
                setHertaFace(strPath + "HertaStealthing.png");
                
            }
        }, 500);

        return () => clearInterval(interval);
    }, [lastInputTime, animationSource]);

    return (
        <div id="signUpContainer">
            <div id="ghostDiv">
                <div id="hertaFaceDiv" onClick={() => togglePasswordVisibility()}>
                    <img src={imageSource} id='hertaFace' />
                </div>
                <div id="hertaHandDiv">
                    <img src={animationSource} id="hertaAction" />
                </div>
            </div>
            <form onSubmit={handleSubmit} id="form">
                <input id="username" type="text" className="signUpInput" placeholder="Username" name="username" onChange={handleText}/>
                <input type="email" className="signUpInput" placeholder="Email" name="email" value={emailField} onChange={handleText} />
                <input id="password" type={showPassword ? "text" : "password"} className="signUpInput" placeholder="Password" name="password" value={passwordField} onChange={handleText} />
                <input id="passwordConfirmation" type={showPassword ? "text" : "password"} className="signUpInput" placeholder="Confirm Password" name="confirmPassword" onChange={handleText} />
                {errorMessage && <p id="errorMessage" className="errorMessage">{errorMessage}</p>}
                <div id="submitContainer">
                    <input type="checkbox" id="togglePassword" checked={isPasswordVisible} onChange={togglePasswordVisibility}></input>
                    <label id="labelCheckbox" htmlFor="togglePassword">Show password</label>
                    <button type="submit" className="signUpButton">Sign Up</button>
                    <p id="alreadyHaveAnAccount">Already have an account?</p>
                </div>
            </form>
        </div>
    );
}
