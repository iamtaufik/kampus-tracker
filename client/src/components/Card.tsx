import { Link } from 'react-router-dom';

interface IProps {
  category: 'Mahasiswa' | 'Dosen' | 'All';
  searchTerm: string;
  item: {
    text: string;
    'website-link': string;
  };
  index: number;
}

const TextHighlight = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
  if (!searchTerm) return <span>{text}</span>;

  // Split searchTerm into individual words and trim each word
  const terms = searchTerm.trim().toLowerCase().split(/\s+/);

  // Create a regex pattern to match each term
  const regexPattern = terms.map((term) => `(${term})`).join('|');
  const regex = new RegExp(regexPattern, 'gi');

  // Split the text based on the regex pattern
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        part && terms.includes(part.toLowerCase()) ? (
          <span key={index} className="bg-yellow-300">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

const Card = ({ item, index, category, searchTerm }: IProps) => {
  if (category === 'Mahasiswa') {
    return (
      <li key={index} className="px-4 py-2 text-base font-semibold border rounded-md shadow-lg bg-zinc-200 border-zinc-400 shadow-zinc-200 text-zinc-700">
        <Link to={`/detail${item['website-link']}`}>
          {item.text.split(', ').map((itemPart, partIndex: number) => (
            <div key={partIndex}>
              {partIndex === 0 ? (
                <p>
                  Nama: <TextHighlight text={itemPart.split('(')[0].trim()} searchTerm={searchTerm} />
                </p>
              ) : partIndex === 1 ? (
                <p>
                  Perguruan Tinggi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />{' '}
                </p>
              ) : (
                <p>
                  Prodi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                </p>
              )}
            </div>
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
                <p>
                  Nama: <TextHighlight text={itemPart.split('(')[0].trim()} searchTerm={searchTerm} />
                </p>
              ) : partIndex === 1 ? (
                <p>
                  NIDN: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                </p>
              ) : partIndex === 2 ? (
                <p>
                  Perguruan Tinggi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                </p>
              ) : (
                <p>
                  Prodi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                </p>
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
            ? item.text.split(', ').map((itemPart, partIndex) => (
                <div key={partIndex}>
                  {partIndex === 0 ? (
                    <p>
                      Nama: <TextHighlight text={itemPart.split('(')[0].trim()} searchTerm={searchTerm} />
                    </p>
                  ) : partIndex === 1 ? (
                    <p>
                      Perguruan Tinggi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                    </p>
                  ) : (
                    <p>
                      Prodi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                    </p>
                  )}
                </div>
              ))
            : item.text.split(', ').map((itemPart, partIndex) => (
                <div key={partIndex}>
                  {partIndex === 0 ? (
                    <p>
                      Nama: <TextHighlight text={itemPart.split('(')[0].trim()} searchTerm={searchTerm} />
                    </p>
                  ) : partIndex === 1 ? (
                    <p>
                      NIDN: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                    </p>
                  ) : partIndex === 2 ? (
                    <p>
                      Perguruan Tinggi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                    </p>
                  ) : (
                    <p>
                      Prodi: <TextHighlight text={itemPart.split(':')[1].trim()} searchTerm={searchTerm} />
                    </p>
                  )}
                </div>
              ))}
        </Link>
      </li>
    );
  }
};

export default Card;
