import { PrismaClient } from "@prisma/client";
import AddSiswa from "./addSiswa";
const prisma = new PrismaClient();

const getSiswa = async () => {
  const res = await prisma.siswa.findMany({
    select: {
      id: true,
      NISN: true,
      Nama: true,
      telepon: true,
      jalur:true,
      id_jalur: true,
    },
  });
  return res;
};
const getJalur = async()=>{
    const res = await prisma.jalur.findMany();
    return res;
};
const Siswa = async () => {
  const [jalur, siswa] = await Promise.all([getJalur(), getSiswa()]);
  return (
    <div>
        <div className="mb-2">
            <AddSiswa jalur={jalur}/>
        </div>
      <table className="table w-full">
        <thead>
          <tr>
            <td>ID</td>
            <td>NISN</td>
            <td>Nama</td>
            <td>Jalur Masuk</td>
            <td>No.HP</td>
            <td className="text-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {siswa.map((siswa, index) => (
            <tr key={siswa.id}>
              <td>{index +1}</td>
              <td>{siswa.NISN}</td>
              <td>{siswa.Nama}</td>
              <td>{siswa.telepon}</td>
              <td>{siswa.jalur.nama_jalur}</td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Siswa;
