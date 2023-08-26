import React from "react";
import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import FilterBar from "../components/FilterBar";

function Navbar(props) {
  return (
    <nav className={styles.navbar}>
        <button className={styles.toggleBtn} onClick={props.toggleSearchBar}>O</button>
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
