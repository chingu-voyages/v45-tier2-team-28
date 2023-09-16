import React from "react";
import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import FilterBar from "../components/FilterBar";

import { BsSearch } from "react-icons/bs";

import { AiOutlineClose } from "react-icons/ai";

function Navbar(props) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.search} onClick={props.toggleSearchBar}>
        {props.searchIsShowing ?  <div> 
        <button className={styles.closeBtn} > <AiOutlineClose/> </button> </div>:  
         <div>  
        <button className={styles.openBtn} >Search <BsSearch className={styles.searchIcon}/></button> 
        </div>}

      </div>

      <Link href="/" className={styles.navItem}>
        Home
      </Link>
      {props.searchIsShowing ? (
          <FilterBar
          submit={props.submit}
          name={props.name}
          updateName={props.updateName}
          updateYear={props.updateYear}
          updateType={props.updateType}
          updateSelected={props.updateSelected}
          type={props.type}
          year={props.year}
          mass={props.mass}
          clear={props.clear}
          />
      ): (null)}
    </nav>
  );
}

export default Navbar;
