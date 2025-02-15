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

    // Serve como chave mestre em condiçoes if || para manipular comportamento da herta na pagina signup
    const [hertaAdmKey, setHertaAdmKey] = useState(false);
    const [hoveringHerta, setHoveringHerta] = useState(false);

    const copyEmailFrame = useRef(0);
    const copyPasswordFrame = useRef(0);

    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [password2Field, setPassword2Field] = useState("");
    
    const [lastInputTime, setLastInputTime] = useState<number>(0);

    function handleText(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.type === "email") {
            setEmailField(event.target.value);
            setHertaFace(strPath + "HertaSpying.png");
            setHertaAction(strPath + `WritingHerta${copyEmailFrame.current + 1}.png`);
            copyEmailFrame.current = (copyEmailFrame.current + 1) % 9;
            setLastInputTime(Date.now());
        } else if (event.target.id === "password") {
            setPasswordField(event.target.value);
            if (showPassword) {
                setHertaFace(strPath + "HertaSpying.png");
                setHertaAction(strPath + `WritingHerta${copyPasswordFrame.current + 1}.png`);
                setLastInputTime(Date.now());
            }
            copyPasswordFrame.current = (copyPasswordFrame.current + 1) % 9;
        } else if (event.target.id === "passwordConfirmation") {
            setPassword2Field(event.target.value);
        }
    }

    function toggleShowPassword() {
        if (!showPassword){
            setHertaAdmKey(true);
            console.log(hertaAdmKey);
        }
        setShowPassword(prev => !prev);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const timeElapsed = Date.now() - lastInputTime;
            if (timeElapsed >= 500 && !hoveringHerta && (!showPassword || hertaAdmKey)) {
                if (imageSource === strPath + "HertaSpying.png") {
                    setHertaAction(strPath + "HertaThinking1.png");
                }
                setHertaFace(strPath + "HertaStealthing.png");
            }
        }, 500);

        return () => clearInterval(interval);
    }, [lastInputTime, emailField, passwordField, strPath, imageSource]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeElapsed = Date.now();
            if (timeElapsed >= 500 && (timeElapsed - lastInputTime) >= 500) {
                const lastChar = animationSource[animationSource.length - 5];
                setHertaAction(strPath + `HertaThinking${(parseInt(lastChar) % 3) + 1}.png`);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [lastInputTime, animationSource]);

    return (
        <div id="signUpContainer">
            <div id="ghostDiv">
                <div id="hertaFaceDiv" 
                    onMouseEnter={() => {
                        setHoveringHerta(true);
                        setHertaFace(imageSource === strPath + "HertaSpying.png" 
                            ? strPath + "HertaStealthing.png" 
                            : strPath + "HertaSpying.png");
                        }
                    }
                    onMouseLeave={() => {
                        setHoveringHerta(false);
                        setHertaFace(imageSource === strPath + "HertaSpying.png" 
                            ? strPath + "HertaStealthing.png" 
                            : strPath + "HertaSpying.png");
                        }
                    }
                    onClick={toggleShowPassword} 
                    > 
                        <img src={imageSource} id='hertaFace' />
                </div>
                <div id="hertaHandDiv">
                    <img src={animationSource} id="hertaAction" />
                </div>
            </div>
            <div id="showPasswordContainer">
                <label className="checkbox-container">
                    <input 
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword} 
                        onChange={toggleShowPassword} 
                    />
                    <span className="checkbox-check" id="spanCheckBox"></span>
                    <label htmlFor="showPassword">Show password</label>
                </label>
            </div>
            <input type="text" className="signUpInput" placeholder="Username" />
            <input type="email" className="signUpInput" placeholder="Email" onChange={handleText} />
            <input id="password" type={showPassword ? "text" : "password"} className="signUpInput passwordField" placeholder="Password" onChange={handleText} />
            <input id="passwordConfirmation" type={showPassword ? "text" : "password"} className="signUpInput passwordField" placeholder="Confirm Password" />
            <div id="submitContainer">
                <button className="signUpButton">Sign Up</button>
                <p id="alreadyHaveAnAccount">Already have an account?</p>
            </div>
        </div>
    );
}
