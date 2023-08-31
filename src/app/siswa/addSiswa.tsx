"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { Jalur, Siswa, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const AddSiswa = (
  { jalur }: { jalur: Jalur[] },
) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<Siswa>();

  const prisma = new PrismaClient();
  const Router = useRouter();
  const onSubmit = async (data :Siswa) => {
    try {
      const response = await axios.post('/api/siswa', data);

      alert(JSON.stringify(response.data))
    } catch (e) {
      console.log("error dalam submit data :", e)      
    }
    Router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Tambah Siswa
      </button>
      <div className={isOpen ? "modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Siswa</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label font-bold">NISN</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Masukan NISN"
                {...register("NISN", { required: true })}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Masukan Nama Siswa"
                {...register("Nama", { min: 8 })}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Jalur Masuk</label>
              <select
                className="select select-bordered"
                {...register("Jalur", { required: true })}
              >
                <option value="" disabled>
                  Pilih Jalur Pendaftaran
                </option>
                {jalur.map((jalur) => (
                  <option value={jalur.nama_jalur} key={jalur.id}>
                    {jalur.nama_jalur}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Nomor Handphone</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Masukan Nomor Handphone"
                {...register("telepon")}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSiswa;
