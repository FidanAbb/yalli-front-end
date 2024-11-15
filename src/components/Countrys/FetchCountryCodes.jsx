import React, { useContext, useEffect, useState } from 'react';
import { YalliContext } from '../../Context/YalliContext';

const countryCategory = [
  "Azerbaijan",
  "Turkey",
  "Russia",
  "Germany",
  "USA",
  "Ukraine",
  "United Kingdom",
  "Canada",
  "France",
  "Israel",
  "Georgia",
  "Italy",
  "Australia",
  "Spain",
  "Netherlands",
  "Austria",
  "Sweden",
  "Belgium",
  "Norway",
  "Finland",
  "Hungary",
  "Poland",
  "Greece",
  "Slovakia",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Kazakhstan",
  "UAE",
  "Japan",
  "Iran",
  "Saudi Arabia",
  "Belarus",
  "Moldova",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Uzbekistan",
  "Malaysia",
  "Singapore",
  "Brazil",
  "Argentina",
  "Mexico",
  "Vietnam",
  "Bali (Indonesia)",
  "Switzerland",
  "Portugal",
  "South Korea"
];

const FetchCountries = () => {
  const {countries,setCountries}=useContext(YalliContext)
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const filteredCountries = data.filter(country => 
          countryCategory.includes(country.name.common)  // Yoxlayır ki, ölkə adı `countryCategory`-də varmı
        ).map(country => ({
          name: country.name.common,
          flag: country.flags.png,  // Bayraq linkini alır
          code: country.cca3.toLowerCase()  // Ölkə kodunu alır (CSS class-ları üçün)
        }));
        setCountries(filteredCountries);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div>

    </div>
  );
};

export default FetchCountries;
