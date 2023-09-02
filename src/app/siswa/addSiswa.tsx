"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { Jalur, Siswa } from "@prisma/client";

const AddSiswa = ({ jalur }: { jalur: Jalur[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, control, setValue, watch } = useForm<Siswa>();
//buat route ke awal pas abis input
  const Router = useRouter();
//handle submitnya
  const onSubmit = async (data: Siswa) => {
    try {
      const response = await axios.post("/api/siswa", data);
      console.log("Data Berhasil di input : ", response.data);
    } catch (e) {
      console.log("error dalam submit data :", e);
    }
    Router.refresh();
    setIsOpen(false);
  };
//handle modalnya
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
//handle buat Change id jalur
  const handleChange = (selectedValue: string) => {
    const selectedJalur = jalur.find(
      (jalur) => jalur.nama_jalur === selectedValue
    );
    if (selectedJalur) {
      setValue("id_jalur", selectedJalur.id);
    } else {
      setValue("id_jalur", 0);
    }
  };

  //render field nya
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
              <Controller
                name="Jalur"
                control={control}
                defaultValue="" 
                render={({ field }) => (
                  <select
                    className="select select-bordered"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Panggil onChange dari Controller
                      handleChange(e.target.value); // Panggil fungsi untuk mengatur input "id Jalur"
                    }}
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
                )}
              />
              <input type="text" {...register("id_jalur")} />
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
