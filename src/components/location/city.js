
import { Select } from 'antd';
import { State,City,Country } from 'country-state-city';

const CityComponent = ({ countryCode , stateCode,onChange}) => {


  // for the country isocode
  // console.log("country in the citys",countryCode);
  // console.log(" states in the citys",stateCode);

  const Countrydata = Country.getAllCountries().map((country) => ({
    value: country.name,
    displayValue: `${country.name} - ${country.isoCode}`,
  }));

//  console.log("state  data citys",Countrydata);

  const filtercountry = Countrydata.filter((Country)=>{
    // console.log("filter function in citys",Country.name);
    return Country.value == countryCode
  })

//  console.log("filter country in citys",filtercountry)
//  console.log('code',filtercountry.map(e => e.displayValue.slice(3,2)))
// console.log('code', filtercountry.map(e => e.displayValue.slice(-2)));
// const isoCode = filtercountry.map(e => e.displayValue.slice(-2))

const [isoCode] = filtercountry.map(e => e.displayValue.slice(-2));
// console.log('code in citys', isoCode);


  // for the state isocode

    const statedata = State.getStatesOfCountry(isoCode).map((state) => ({
      value: state.name,
      displayValue: `${state.name} - ${state.isoCode}`,
    }));

    const filterStates = statedata.filter((State)=>{
      // console.log("filter function in citys",State.name);
      return State.value == stateCode
    })

    const [stateIsoCode] = filterStates.map(e => e.displayValue.slice(-2));

    const data = City.getCitiesOfState(isoCode, stateIsoCode).map(city => ({
        value: city.name,
        displayValue: city.name
    }))

    const handleCityChange = (value) => {
      onChange(value);
    };

  return (
    <Select placeholder="Select the city" onChange={handleCityChange}>
      <Select.Option key={-1} value="" disabled>
        -- Select the city --
      </Select.Option>
      {data.map((option, index) => (
        <Select.Option key={index} value={option.value}>
          {option.displayValue}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CityComponent;