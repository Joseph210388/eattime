import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    return(
        <>
            <div className="flex justify-center p-12">
                <SignUp/>
            </div>
        </>
    );
}