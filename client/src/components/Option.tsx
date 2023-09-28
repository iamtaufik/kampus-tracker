import React from 'react';

interface IProps {
  setOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Option = ({ setOption }: IProps) => {
  return (
    <select
      name="category"
      id="category"
      className="flex py-1 pl-2 mt-2 text-sm transition-colors border rounded-md shadow-sm h-9 border-input bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      onChange={setOption}
    >
      <option value="All">All</option>
      <option value="Mahasiswa" selected>
        Mahasiswa
      </option>
      <option value="Dosen">Dosen</option>
    </select>
  );
};

export default Option;
