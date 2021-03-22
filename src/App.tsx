import React from "react";

const App: React.FC = () => {
  const [search, setSearch] = React.useState("");

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
};

type SearchProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  children: string;
};

const Search: React.FC<SearchProps> = ({ value, onChange, children }) => {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default App;
