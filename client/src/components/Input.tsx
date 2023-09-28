import React from 'react';

interface IProps {
  search: string;
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ search, setSearch }: IProps) => {
  return (
    <input
      value={search}
      onChange={setSearch}
      className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm bg-background shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground focus-visible:outline-none pl-10 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Cari data mahasiswa atau dosen.."
      required
      type="search"
      name="value"
    />
  );
};

export default Input;
