import { useEffect, useRef, useState } from "react";
import { ChangeEvent } from "react";
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

    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    
    const [lastInputTime, setLastInputTime] = useState<number>(0);

    function handleText(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.type == "email") {
            setEmailField(event.target.value);
            setHertaFace(strPath + "HertaSpying.png");
            setHertaAction(strPath + `WritingHerta${copyEmailFrame.current + 1}.png`);
            if (copyEmailFrame.current <= 8) {
                copyEmailFrame.current ++;
            } else {
                copyEmailFrame.current = 0;
            }
            setLastInputTime(Date.now());

        } else if (event.target.id == "password") {
            setPasswordField(event.target.value);
            if (showPassword) {
                setHertaFace(strPath + "HertaSpying.png");
                setHertaAction(strPath + `WritingHerta${copyPasswordFrame.current + 1}.png`);
            }
            if (copyPasswordFrame.current <= 8) {
                copyPasswordFrame.current ++;
            } else {
                copyPasswordFrame.current = 0;
            }
            setLastInputTime(Date.now());
        }
    }

    // Inicializacao Timer de last input
    useEffect(() => {
        const interval = setInterval(() => {
            const timeElapsed = Date.now() - lastInputTime;
            if (timeElapsed >= 800) {
                if (!showPassword) {
                    if (imageSource == strPath + "HertaSpying.png") {
                        setHertaAction(strPath + "HertaThinking1.png");
                    }
                    setHertaFace(strPath + "HertaStealthing.png");
                }
            }
        }, 800);

        return () => clearInterval(interval);
    }, [lastInputTime, emailField, passwordField, strPath, imageSource]);

    // Inicializacao de animacaoIdle Thinking
    useEffect(() => {
        const interval = setInterval(() => {
            const timeElapsed = Date.now();
            if (timeElapsed >= 500 && !showPassword && (timeElapsed - lastInputTime) >= 500) {
                if (animationSource[animationSource.length-5] == "1") {
                    setHertaAction(strPath + "HertaThinking2.png");
                } else if (animationSource[animationSource.length-5] == "2") {
                    setHertaAction(strPath + "HertaThinking3.png");
                } else if (animationSource[animationSource.length-5] == "3") {
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
            <input type="text" className="signUpInput" placeholder="Username" />
            <input type="email" className="signUpInput" placeholder="Email" onChange={handleText} />
            <input id="password" type="password" className="signUpInput" placeholder="Password" onChange={handleText} />
            <input id="passwordConfirmation" type="password" className="signUpInput" placeholder="Confirm Password" />
            <div id="submitContainer">
                <button className="signUpButton">Sign Up</button>
                <p id="alreadyHaveAnAccount">Already have an account?</p>
            </div>
        </div>
    );
}
