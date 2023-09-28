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
      <li key={index} className="bg-zinc-200 border border-zinc-400 px-4 py-2 rounded-md shadow-zinc-200 shadow-lg text-base font-semibold text-zinc-700">
        {item.text.split(', ').map((itemPart, partIndex: number) => (
          <div key={partIndex}>{partIndex === 0 ? <p>Nama: {itemPart.split('(')[0].trim()}</p> : partIndex === 1 ? <p>Perguruan Tinggi: {itemPart.split(':')[1].trim()}</p> : <p>Prodi: {itemPart.split(':')[1].trim()}</p>}</div>
        ))}
      </li>
    );
  }

  if (category === 'Dosen') {
    return (
      <li key={index} className="bg-zinc-200 border border-zinc-400 px-4 py-2 rounded-md shadow-zinc-200 shadow-lg text-base font-semibold text-zinc-700">
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
      </li>
    );
  }

  if (category === 'All') {
    return (
      <li key={index} className="bg-zinc-200 border border-zinc-400 px-4 py-2 rounded-md shadow-zinc-200 shadow-lg text-base font-semibold text-zinc-700">
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
      </li>
    );
  }
};

export default Card;
