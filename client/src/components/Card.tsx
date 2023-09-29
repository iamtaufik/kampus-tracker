import { Link } from 'react-router-dom';

interface IProps {
  category: 'Mahasiswa' | 'Dosen' | 'All';
  item: {
    text: string;
    'website-link': string;
  };
  index: number;
}

const Card = ({ item, index, category }: IProps) => {
  if (category === 'Mahasiswa') {
    return (
      <li key={index} className="px-4 py-2 text-base font-semibold border rounded-md shadow-lg bg-zinc-200 border-zinc-400 shadow-zinc-200 text-zinc-700">
        <Link to={`/detail${item['website-link']}`}>
          {item.text.split(', ').map((itemPart, partIndex: number) => (
            <div key={partIndex}>{partIndex === 0 ? <p>Nama: {itemPart}</p> : partIndex === 1 ? <p>Perguruan Tinggi: {itemPart.split(':')[1].trim()}</p> : <p>Prodi: {itemPart.split(':')[1].trim()}</p>}</div>
          ))}
        </Link>
      </li>
    );
  }

  if (category === 'Dosen') {
    return (
      <li key={index} className="px-4 py-2 text-base font-semibold border rounded-md shadow-lg bg-zinc-200 border-zinc-400 shadow-zinc-200 text-zinc-700">
        <Link to={`/detail${item['website-link']}`}>
          {item.text.split(', ').map((itemPart, partIndex) => (
            <div key={partIndex}>
              {partIndex === 0 ? (
                <p>Nama: {itemPart.split('(')[0].trim()}</p>
              ) : partIndex === 1 ? (
                <p>NIDN: {itemPart.split(':')[1].trim()}</p>
              ) : partIndex === 2 ? (
                <p>Perguruan Tinggi: {itemPart.split(':')[1].trim()}</p>
              ) : (
                <p>Prodi: {itemPart.split(':')[1].trim()}</p>
              )}
            </div>
          ))}
        </Link>
      </li>
    );
  }

  if (category === 'All') {
    return (
      <li key={index} className="px-4 py-2 text-base font-semibold border rounded-md shadow-lg bg-zinc-200 border-zinc-400 shadow-zinc-200 text-zinc-700">
        <Link to={`/detail${item['website-link']}`}>
          {item.text.split(', ').length === 3
            ? item.text
                .split(', ')
                .map((itemPart, partIndex) => (
                  <div key={partIndex}>{partIndex === 0 ? <p>Nama: {itemPart.split('(')[0].trim()}</p> : partIndex === 1 ? <p>Perguruan Tinggi: {itemPart.split(':')[1].trim()}</p> : <p>Prodi: {itemPart.split(':')[1].trim()}</p>}</div>
                ))
            : item.text
                .split(', ')
                .map((itemPart, partIndex) => (
                  <div key={partIndex}>
                    {partIndex === 0 ? (
                      <p>Nama: {itemPart.split('(')[0].trim()}</p>
                    ) : partIndex === 1 ? (
                      <p>NIDN: {itemPart.split(':')[1].trim()}</p>
                    ) : partIndex === 2 ? (
                      <p>Perguruan Tinggi: {itemPart.split(':')[1].trim()}</p>
                    ) : (
                      <p>Prodi: {itemPart.split(':')[1].trim()}</p>
                    )}
                  </div>
                ))}
        </Link>
      </li>
    );
  }
};

export default Card;
