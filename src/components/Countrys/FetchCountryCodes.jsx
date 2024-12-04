import React, { useContext, useEffect } from 'react';
import { YalliContext } from '../../Context/YalliContext';

const countryCategory = [
  { az: "Azərbaycan", en: "Azerbaijan" },
  { az: "Türkiyə", en: "Turkey" },
  { az: "Rusiya", en: "Russia" },
  { az: "Almaniya", en: "Germany" },
  { az: "ABŞ", en: "United States" },
  { az: "Ukrayna", en: "Ukraine" },
  { az: "Birləşmiş Krallıq", en: "United Kingdom" },
  { az: "Kanada", en: "Canada" },
  { az: "Fransa", en: "France" },
  { az: "İsrail", en: "Israel" },
  { az: "Gürcüstan", en: "Georgia" },
  { az: "İtaliya", en: "Italy" },
  { az: "Avstraliya", en: "Australia" },
  { az: "İspaniya", en: "Spain" },
  { az: "Niderland", en: "Netherlands" },
  { az: "Avstriya", en: "Austria" },
  { az: "İsveç", en: "Sweden" },
  { az: "Belçika", en: "Belgium" },
  { az: "Norveç", en: "Norway" },
  { az: "Finlandiya", en: "Finland" },
  { az: "Macarıstan", en: "Hungary" },
  { az: "Polşa", en: "Poland" },
  { az: "Yunanıstan", en: "Greece" },
  { az: "Slovakiya", en: "Slovakia" },
  { az: "Litva", en: "Lithuania" },
  { az: "Latviya", en: "Latvia" },
  { az: "Estoniya", en: "Estonia" },
  { az: "Qazaxıstan", en: "Kazakhstan" },
  { az: "BƏƏ", en: "United Arab Emirates" },
  { az: "Yaponiya", en: "Japan" },
  { az: "İran", en: "Iran (Islamic Republic of)" },
  { az: "Səudiyyə Ərəbistanı", en: "Saudi Arabia" },
  { az: "Belarus", en: "Belarus" },
  { az: "Moldova", en: "Moldova" },
  { az: "Qırğızıstan", en: "Kyrgyzstan" },
  { az: "Tacikistan", en: "Tajikistan" },
  { az: "Türkmənistan", en: "Turkmenistan" },
  { az: "Özbəkistan", en: "Uzbekistan" },
  { az: "Malayziya", en: "Malaysia" },
  { az: "Sinqapur", en: "Singapore" },
  { az: "Braziliya", en: "Brazil" },
  { az: "Argentina", en: "Argentina" },
  { az: "Meksika", en: "Mexico" },
  { az: "Vyetnam", en: "Vietnam" },
  { az: "İndoneziya", en: "Indonesia" },
  { az: "İsveçrə", en: "Switzerland" },
  { az: "Portuqaliya", en: "Portugal" },
  { az: "Cənubi Koreya", en: "Korea (Republic of)" },
];

const FetchCountries = () => {
  const { countries,setCountries, mentors } = useContext(YalliContext);
  
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const englishCountryNames = countryCategory.map((country) => country.en);
        
        data.map(country=>{
          if(country.name.common=="USA"){
            console.log(country.name.common);
            
          }
          
        })
        const filteredCountries = data
          .filter((country) => englishCountryNames.includes(country.name.common))
          .map((country) => ({
            name: country.name.common,
            flag: country.flags.png,
          }));

        const mentorFlags = mentors
          .map((mentor) => {
            const matchingCategory = countryCategory.find((cat) => cat.az === mentor.country);
            const englishName = matchingCategory?.en;
            return filteredCountries.find((country) => country.name === englishName)?.flag || null;
          })
          .filter((flag) => flag); // null dəyərləri silmək üçün

        setCountries(mentorFlags);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, [mentors, setCountries]);

  return <div />;
};

export default FetchCountries;
