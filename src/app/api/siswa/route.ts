import { NextResponse } from "next/server";
import type { Siswa, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request : Request) =>{
    const iniUser:User |null = await prisma.user.findUnique({
        where:{
            id:Number("1")
        },
    });
    if(!iniUser){
        console.error("User Tidak ditemukan")
        return;
    }
    const body:Siswa = await request.json();
    const siswa = await prisma.siswa.create({
        data :{
            NISN: body.NISN,
            Nama: body.Nama,
            Jalur:body.Jalur,
            telepon: body.telepon,
            id_jalur: body.id_jalur,
            id_user:iniUser.id,
        }
    });
    return NextResponse.json(siswa);
}