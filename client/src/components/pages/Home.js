import React, { useState } from "react";
import Contacts from "../contacts/Contacts";
import SearchBar from "../contacts/SearchBar";
import Mode from "../layout/Modal";
import OnOffBtn from '../forms/OnOffBtn'
import { createGlobalStyle } from 'styled-components'
// import { Builder, By, Key, util } from 'selenium-webdriver'

const Home = () => {

  return (
    // <div className="grid-2">
    <div>
      {/* <button onClick={example()}>Press here</button> */}
      <Mode />
      <div className="flexTop">
        <ul>
          <li><SearchBar /></li>
          <li><OnOffBtn darkMode={true} /></li>

        </ul>


      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
