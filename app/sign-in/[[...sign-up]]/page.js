import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
    return(
        <>
            <div className="background-image flex justify-center p-44 ">
                <SignIn/>
            </div>
        </>
    );
}