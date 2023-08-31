import { NextResponse } from "next/server";
import type { Siswa } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request : Request) =>{
    const body:Siswa = await request.json();
    const siswa = await prisma.siswa.create({
        data :{
            NISN: body.NISN,
            Nama: body.Nama,
            Jalur:body.Jalur,
            telepon: body.telepon,
            id_jalur: body.id_jalur,
            id_user:body.id_user

        }
    });
    return NextResponse.json(siswa);
}