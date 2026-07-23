import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "unauthorized" }, { status: 400 })
        }
        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return Response.json({ message: "user not found" }, { status: 400 })
        }

        const formdata=await req.formData()
        const aadhar=formdata.get("aadhar") as Blob | null
        const license=formdata.get("license") as Blob | null
        const rc=formdata.get("rc") as Blob | null

        if(!aadhar || !license || !rc){
            return Response.json({ message: "all documents are required" }, { status: 400 })
        }
    } catch (error) {
        
    }
}