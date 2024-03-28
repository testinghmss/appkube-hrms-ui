import { Select } from 'antd';
import { useState } from 'react';
import { Country} from "country-state-city";


const CountryComponent = ({ value, onChange, data }) => {
  const [selectedCountry, setSelectedCountry] = useState(value);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    onChange(value);
  };

  const Countrydata = Country.getAllCountries().map((country) => ({
    value: country.name,
    displayValue: `${country.name} - ${country.isoCode}`,
  }));

  return (
    <Select
      showSearch
      placeholder="Select a country"
      optionFilterProp="children"
      onChange={handleCountryChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
      value={selectedCountry}
      className="w-[33.5%] mr-4 p-1 border border-gray-300 outline-[#1890FF]"
    >
      {Countrydata.map((country) => (
        <Select.Option key={country.value} value={country.value}>
          {country.displayValue}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CountryComponent;
