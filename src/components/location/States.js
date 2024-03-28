
import { Select } from 'antd';
import { State ,Country} from 'country-state-city';
// import { useState,useEffect} from 'react';

const StateComponent = ({ countryCode,changeState,onChange }) => {
    // console.log("it the country code",countryCode);
    
    const Countrydata = Country.getAllCountries().map((country) => ({
      value: country.name,
      displayValue: `${country.name} - ${country.isoCode}`,
    }));

  //  console.log("state  data",Countrydata);

    const filtercountry = Countrydata.filter((Country)=>{
      // console.log("filter function",Country.name);
      return Country.value == countryCode
    })

  //  console.log("filter country",filtercountry)
  //  console.log('code',filtercountry.map(e => e.displayValue.slice(3,2)))
  // console.log('code', filtercountry.map(e => e.displayValue.slice(-2)));
  // const isoCode = filtercountry.map(e => e.displayValue.slice(-2))

  const [isoCode] = filtercountry.map(e => e.displayValue.slice(-2));
// console.log('code', isoCode);


  const data = State.getStatesOfCountry(isoCode).map((state) => ({
    value: state.name,
    displayValue: `${state.name} - ${state.isoCode}`,
  }));

  const handleStateChange = (value) => {
    onChange(value);
  };

  return (
    <Select placeholder="Select the state" onChange={
      handleStateChange
      // ,console.log("it is the call back",value);
     }>
      <Select.Option key={-1} value="" disabled>
        -- Select the state --
      </Select.Option>
      {data.map((option, index) => (
        <Select.Option key={index} value={option.value}>
          {option.displayValue}
        </Select.Option>
      ))}
    </Select>
  );
};

export default StateComponent;



