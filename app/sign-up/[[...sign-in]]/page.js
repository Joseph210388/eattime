import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    return(
        <>
            <div className="background-image flex justify-center p-40 ">
                <SignUp/>
            </div>
        </>
    );
}