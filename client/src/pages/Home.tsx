import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import Card from '../components/Card';
import Option from '../components/Option';
import Input from '../components/Input';

const BASE_URL = '/api';

interface IData {
  text: string;
  'website-link': string;
}

const Home = () => {
  const [category, setCategory] = useState('Mahasiswa');
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setdata] = useState<IData[]>([]);
  const [debounceValue] = useDebounce(search, 1500);

  const getData = async () => {
    try {
      setdata([]);
      setIsLoading(true);
      const { data } = await axios(`${BASE_URL}/${category}/?search=${debounceValue}`);
      //   console.log(data.data);
      setdata(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceValue !== '') {
      getData();
    }
  }, [category, debounceValue]);

  return (
    <div className="container mt-4">
      <h1 className="my-2 text-xl font-semibold text-center text-zinc-900">Cari Data Mahasiswa atau Dosen</h1>
      <p className="my-2 text-center text-zinc-700">
        Website ini diggunakan untuk tracker data mahasiswa atau dosen dari seluruh perguruan tinggi di Indonesia. Website ini terinspirasi dari{' '}
        <a href="https://cari-mahasiswa.vercel.app/" className="text-blue-400 underline" target="_blank">
          Cari Mahasiswa
        </a>
      </p>
      <div className="w-full">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex items-center justify-start">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute ml-3">
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <Input search={search} setSearch={(e) => setSearch(e.target.value)} />
          </div>
          <div>
            <Option setOption={(e) => setCategory(e.target.value)} />
          </div>
        </form>
      </div>
      <div className="mt-6">
        <h1 className="px-4 py-2 my-4 font-semibold border rounded-md text-zinc-900 border-zinc-400 w-max">Category: {category}</h1>
        <div className="w-full">
          {isLoading && <p className="text-center">Tunggu.....</p>}
          <ul className="flex flex-col gap-4">
            {category === 'Mahasiswa' && data.map((item, index) => <Card item={item} index={index} category="Mahasiswa" />)}
            {category === 'Dosen' && data.map((item, index) => <Card item={item} index={index} category="Dosen" />)}
            {category === 'All' && data.map((item, index) => <Card item={item} index={index} category="All" />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
