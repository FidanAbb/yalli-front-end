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
  const { setCountries, mentors } = useContext(YalliContext);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredCountries = countryCategory.map((category) => {
          const countryData = data.find(
            (country) => country.name.common === category.en
          );
          return {
            name: category.en,
            flag: countryData?.flags.png || null,
          };
        });

        const mentorFlags = mentors.map((mentor) => {
          const countryInfo = countryCategory.find(
            (cat) => cat.az === mentor.country
          );
          const flag = filteredCountries.find(
            (country) => country.name === countryInfo?.en
          )?.flag;

          return { mentorName: mentor.fullName, flag }; // Array-in sonunda yalnız bayrağı olanları göndərmək üçün.
        });

        // Yalnız bayrağı olanları filtr edirəm
        const validMentors = mentorFlags.filter((item) => item.flag);

        // Local storage-a yalnız bayrağı olanları bir array olaraq saxlayıram
        const currentMentorFlags = validMentors.map((mentor) => ({
          mentorName: mentor.mentorName,
          flag: mentor.flag,
        }));

        localStorage.setItem(
          'mentorFlags',
          JSON.stringify(currentMentorFlags) // Məlumatları bir array olaraq saxlayırıq
        );

        // MentorFlags-ı set edirik
        setCountries(currentMentorFlags.map((mentor) => mentor.flag));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, [mentors, setCountries]);

  return <div />;
};

export default FetchCountries;
