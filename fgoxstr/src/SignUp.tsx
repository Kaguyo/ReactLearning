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

    const [usernameField, setUsernameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [passwordConfirmationField, setPasswordConfirmationField] = useState("");

    const [lastInputTime, setLastInputTime] = useState<number>(0);

    function handleText(event: ChangeEvent<HTMLInputElement>) {
        const { type, id, value } = event.target;

        if (id === "username") {
            setUsernameField(value);
        } else if (type === "email") {
            setEmailField(value);
            setHertaFace(strPath + "HertaSpying.png");
            setHertaAction(strPath + `WritingHerta${copyEmailFrame.current + 1}.png`);
            copyEmailFrame.current = (copyEmailFrame.current + 1) % 9;
        } else if (id === "password") {
            setPasswordField(value);
            if (showPassword) {
                setHertaFace(strPath + "HertaSpying.png");
                setHertaAction(strPath + `WritingHerta${copyPasswordFrame.current + 1}.png`);
            }
            copyPasswordFrame.current = (copyPasswordFrame.current + 1) % 9;
        } else if (id === "passwordConfirmation") {
            setPasswordConfirmationField(value);
        }

        setLastInputTime(Date.now());
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        const userData = {
            username: usernameField,
            email: emailField,
            password: passwordField
        };
    
        signUpUser(userData)
            .then((data) => {
                console.log('User created successfully', data);
            })
            .catch((error) => {
                console.error('Failed to create user', error);
            });
    }

    function hertaIconSwitch(image: string) {
       
        
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
            if (timeElapsed >= 500 && !showPassword && (timeElapsed - lastInputTime) >= 500) {
                const lastChar = animationSource[animationSource.length - 5];
                if (lastChar === "1") {
                    setHertaAction(strPath + "HertaThinking2.png");
                } else if (lastChar === "2") {
                    setHertaAction(strPath + "HertaThinking3.png");
                } else {
                    setHertaAction(strPath + "HertaThinking1.png");
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [lastInputTime, animationSource]);

    return (
        <div id="signUpContainer">
            <div id="ghostDiv">
                <div id="hertaFaceDiv" onClick={() => hertaIconSwitch(imageSource)}>
                    <img src={imageSource} id='hertaFace' />
                </div>
                <div id="hertaHandDiv">
                    <img src={animationSource} id="hertaAction" />
                </div>
            </div>
            <form onSubmit={handleSubmit} id="form">
                <input id="username" type="text" className="signUpInput" placeholder="Username" name="username" onChange={handleText}/>
                <input type="email" className="signUpInput" placeholder="Email" name="email" value={emailField} onChange={handleText} />
                <input id="password" type="password" className="signUpInput" placeholder="Password" name="password" value={passwordField} onChange={handleText} />
                <input id="passwordConfirmation" type="password" className="signUpInput" placeholder="Confirm Password" name="confirmPassword" />
                <div id="submitContainer">
                    <button type="submit" className="signUpButton">Sign Up</button>
                    <p id="alreadyHaveAnAccount">Already have an account?</p>
                </div>
            </form>
        </div>
    );
}
