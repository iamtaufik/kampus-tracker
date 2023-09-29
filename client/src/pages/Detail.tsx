import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = '/api';

interface IDataKuliah {
  id_smt: string;
  sks_smt: number;
  nm_stat_mhs: string;
}

interface IDataStudi {
  kode_mk: string;
  nm_mk: string;
  sks_mk: number;
  id_smt: string;
  nilai_huruf: string;
}

const Detail = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataUmum, setDataUmum] = useState<any>({});
  const [dataKuliah, setDataKuliah] = useState<IDataKuliah[]>([]);
  const [dataStudi, setDataStudi] = useState<IDataStudi[]>([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/${category}/${id}`);
      setDataUmum(data.data.dataUmum);
      setDataKuliah(data.data.dataKuliah);
      setDataStudi(data.data.dataStudi);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-10">
      <h1 className="text-xl">Biodata {category === 'data_mahasiswa' ? 'Mahasiswa' : 'Dosen'}</h1>
      <div className="flex justify-center w-full mt-10">
        {isLoading && <p className="text-center">Tunggu...</p>}
        {!isLoading && (
          <table className="table w-full text-sm table-auto">
            <tbody>
              <tr>
                <td className="text-left">Nama</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.nm_pd}</td>
              </tr>
              <tr>
                <td className="text-left">Jenis Kelamin</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.jk === 'L' ? 'Laki - Laki' : 'Perempuan'}</td>
              </tr>
              <tr>
                <td className="text-left">Perguruan Tinggi</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.namapt}</td>
              </tr>
              <tr>
                <td className="text-left">Program Studi</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.namaprodi}</td>
              </tr>
              <tr>
                <td className="text-left">Jenjang</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.namajenjang}</td>
              </tr>
              <tr>
                <td className="text-left">Nomor Induk Mahasiswa</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.nipd}</td>
              </tr>
              <tr>
                <td className="text-left">Semester Awal</td>
                <td className="text-center">:</td>
                <td className="text-center">
                  {dataUmum.mulai_smt?.charAt(4) === '1' ? 'Ganjil' : 'Genap'} {dataUmum.mulai_smt?.slice(0, -1)}
                </td>
              </tr>
              <tr>
                <td className="text-left">Status Awal Mahasiswa</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.nm_jns_daftar}</td>
              </tr>
              <tr>
                <td className="text-left">Status Mahasiswa Saat Ini</td>
                <td className="text-center">:</td>
                <td className="text-center">{dataUmum.ket_keluar ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div>
        <ul className="flex gap-2">
          <li onClick={() => setIsActive(!isActive)} className={isActive ? 'underline' : ''}>
            Riwayat Status Kuliah
          </li>
          <li onClick={() => setIsActive(!isActive)} className={!isActive ? 'underline' : ''}>
            Riwayat Studi
          </li>
        </ul>
      </div>
      {isActive && (
        <div>
          <h1 className="text-xl ">Riwayat Status Kuliah</h1>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Semester</th>
                <th>Status</th>
                <th>SKS</th>
              </tr>
            </thead>
            <tbody>
              {dataKuliah.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id_smt?.slice(0, -1)}</td>
                  <td>{item.nm_stat_mhs}</td>
                  <td>{item.sks_smt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isActive && (
        <div>
          <h1 className="text-xl ">Riwayat Studi</h1>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Semester</th>
                <th>Kode Mata Kuliah</th>
                <th>Mata Kuliah</th>
                <th>SKS</th>
              </tr>
            </thead>
            <tbody>
              {dataStudi.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {item.id_smt?.charAt(4) === '1' ? 'Ganjil' : 'Genap'} {item.id_smt?.slice(0, -1)}
                  </td>
                  <td>{item.kode_mk}</td>
                  <td>{item.nm_mk}</td>
                  <td>{item.sks_mk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Detail;
