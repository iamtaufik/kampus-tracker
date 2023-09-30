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
      <div className="my-4">
        <a href="/" className="px-4 py-2 font-bold text-white rounded bg-zinc-500 hover:bg-zinc-600">
          Kembali
        </a>
      </div>
      <div className="flex justify-center w-full mt-10">
        {isLoading && <p className="text-center">Tunggu...</p>}
        {!isLoading && (
          <table className="table w-full text-sm table-auto">
            <tbody>
              <tr>
                <td className="font-semibold text-left">Nama</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.nm_pd}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Jenis Kelamin</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.jk === 'L' ? 'Laki - Laki' : 'Perempuan'}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Perguruan Tinggi</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.namapt}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Program Studi</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.namaprodi}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Jenjang</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.namajenjang}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Nomor Induk Mahasiswa</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.nipd}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Semester Awal</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">
                  {dataUmum.mulai_smt?.charAt(4) === '1' ? 'Ganjil' : 'Genap'} {dataUmum.mulai_smt?.slice(0, -1)}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Status Awal Mahasiswa</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.nm_jns_daftar}</td>
              </tr>
              <tr>
                <td className="font-semibold text-left">Status Mahasiswa Saat Ini</td>
                <td className="font-semibold text-center">:</td>
                <td className="text-center">{dataUmum.ket_keluar ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {!isLoading && (
        <div className="my-4">
          <ul className="flex gap-2">
            <li onClick={() => setIsActive(!isActive)} className={`cursor-pointer ${isActive ? 'underline' : ''}`}>
              Riwayat Status Kuliah
            </li>
            <li onClick={() => setIsActive(!isActive)} className={`cursor-pointer ${!isActive ? 'underline' : ''}`}>
              Riwayat Studi
            </li>
          </ul>
        </div>
      )}
      {isActive && !isLoading && (
        <div className="flex flex-col my-6">
          <div className="grid">
            <h1 className="mb-2 text-xl">Riwayat Status Kuliah</h1>
          </div>
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y rounded-md bg-zinc-300 divide-zinc-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        Semester
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        SKS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-300">
                    {dataKuliah.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{item.id_smt?.slice(0, -1)}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{item.nm_stat_mhs}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{item.sks_smt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isActive && !isLoading && (
        <div className="flex flex-col my-6">
          <div className="grid">
            <h1 className="mb-2 text-xl">Riwayat Studi</h1>
          </div>
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y rounded-md bg-zinc-300 divide-zinc-300">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        Semester
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        Kode Mata Kuliah
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        Mata Kuliah
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-center uppercase text-zinc-800">
                        SKS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-300">
                    {dataStudi.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                          {item.id_smt?.charAt(4) === '1' ? 'Ganjil' : 'Genap'} {item.id_smt?.slice(0, -1)}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{item.kode_mk}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{item.nm_mk}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">{item.sks_mk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
