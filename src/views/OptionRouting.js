import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HASH_OPTIONS, CRYPTOGRAPHY_OPTIONS } from "./constants/options";

import HashView from "./components/options/HashView";
import CryptographyView from "./components/options/CryptographyView";

const OptionRouting = () => {
  const { option } = useParams();
  const [selectedOption, setSelectedOption] = useState(option);
  
  const navigate = useNavigate();

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
      <Navbar />
      {isHashOption && <HashView option={option}/>}
      {isCryptographyOption && <CryptographyView />}
    </div>
  );
};

export default OptionRouting;