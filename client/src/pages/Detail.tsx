import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Detail = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://localhost:3000/api/${category}/${id}`);
      setData(data.data);
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
          <table className="table w-2/3 table-auto">
            <tbody>
              <tr>
                <td className="text-left">Nama</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.nm_pd}</td>
              </tr>
              <tr>
                <td className="text-left">Jenis Kelamin</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.jk}</td>
              </tr>
              <tr>
                <td className="text-left">Perguruan Tinggi</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.namapt}</td>
              </tr>
              <tr>
                <td className="text-left">Program Studi</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.namaprodi}</td>
              </tr>
              <tr>
                <td className="text-left">Jenjang</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.namajenjang}</td>
              </tr>
              <tr>
                <td className="text-left">Nomor Induk Mahasiswa</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.nipd}</td>
              </tr>
              <tr>
                <td className="text-left">Semester Awal</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.mulai_smt}</td>
              </tr>
              <tr>
                <td className="text-left">Status Awal Mahasiswa</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.nm_jns_daftar}</td>
              </tr>
              <tr>
                <td className="text-left">Stats Mahasiswa Saat Ini</td>
                <td className="text-center">:</td>
                <td className="text-center">{data.ket_keluar}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Detail;
