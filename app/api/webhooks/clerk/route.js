import { clerkClient } from "@clerk/nextjs/dist/types/server";
import {WebhookEvent} from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

/* llamamos a createUser */
import { createUser } from "@/backend/actions/user";


export async function POST(req){

    

}