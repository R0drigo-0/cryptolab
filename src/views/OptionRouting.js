import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HashView from "./components/options/HashView";
import CryptographyView from "./CryptographyView";
import { HASH_OPTIONS, CRYPTOGRAPHY_OPTIONS } from "./constants/options";

const OptionRouting = () => {
  const { option } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(option);

  useEffect(() => {
    setSelectedOption(option);
  }, [option]);

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
    navigate(`/options/${newOption}`);
  };

  const isHashOption = HASH_OPTIONS.includes(selectedOption);
  const isCryptographyOption = CRYPTOGRAPHY_OPTIONS.includes(selectedOption);

  return (
    <div>
      <h1>Selected Option: {selectedOption}</h1>
      {isHashOption && <HashView />}
      {isCryptographyOption && <CryptographyView />}
      {/* Add more buttons or a dropdown for other options */}
    </div>
  );
};

export default OptionRouting;