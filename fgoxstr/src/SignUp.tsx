import { useEffect } from "react";
import './assets/styles/SignUp.css';

interface SignUpProps {
    imageSource : string;
    animationSource : string;
    setHertaFace : React.Dispatch<React.SetStateAction<string>>;
    setHertaAction : React.Dispatch<React.SetStateAction<string>>;
}

export function SignUp({ imageSource, animationSource, setHertaFace, setHertaAction }: SignUpProps) {
    function hertaTakeAction(animationSource: string) {
        let size = animationSource.length;

        if (animationSource[size - 5] === "1") {
            setHertaAction(animationSource.slice(0, size - 5) + "2.png");
        } else if (animationSource[size - 5] === "2") {
            setHertaAction(animationSource.slice(0, size - 5) + "3.png");
        } else if (animationSource[size - 5] === "3") {
            setHertaAction(animationSource.slice(0, size - 5) + "1.png");
        }
    }

    function hertaIconSwitch(imageSource : string){
        let strPath = ""
        let index = 0
        while (imageSource[index] != "H"){
            strPath += imageSource[index]
            index++
            if (index >= imageSource.length -1) break
        }

        if (imageSource.indexOf("y") == -1){
            setHertaFace(strPath + "HertaSpying.png")
        } else {
            setHertaFace(strPath + "HertaStealthing.png")
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            hertaTakeAction(animationSource);
        }, 500);

        return () => clearInterval(interval);
    }, [animationSource]);

    return (
        <div id="signUpContainer">
            <div id="ghostDiv">
                <div id="hertaFaceDiv" onClick={() => hertaIconSwitch(imageSource)}>
                    <img src={imageSource} id='hertaSpy' />
                </div>
                <div id="hertaHandDiv">
                    <img src={animationSource} id="hertaAction" />
                </div>
            </div>
            <input type="text" className="signUpInput" placeholder="Username" />
            <input type="email" className="signUpInput" placeholder="Email" />
            <input type="password" className="signUpInput" placeholder="Password" />
            <input type="password" className="signUpInput" placeholder="Confirm Password" />
            <div id="submitContainer">
                <button className="signUpButton">Sign Up</button>
                <p id="alreadyHaveAnAccount">Already have an account?</p>
            </div>
        </div>
    );
}