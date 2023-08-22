import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Filterbar.module.css";

function FilterBar() {
  const toggleButton = (e) => {
    e.preventDefault();
    alert("Button has been pressed");
  };

  const clear = (e) => {
    e.preventDefault();
    alert("Button has been pressed");
  }
  const imgUrl = "https://img.icons8.com/?size=512&id=20006&format=png";
  return (
    <div className={styles.formContainer}>
      <form onSubmit={toggleButton} className={styles.form} id="filter-bar-form">
        <button type='button' onClick={clear} className={styles.button}>Clear</button>
        <input placeholder="Name" type="text" />
        <div>
          <label for="year-strike">Year</label>
          <input type="number" min={1000} max={3000} id="year-strike" />
        </div>
        <div>
          <label for="class-type">Class</label>
          <input typ="text" id="class-type" />
        </div>
        <div className={styles.range}>
            <label for="mass-range">Mass Range</label>
          <div className={styles.checkbox}>
            <span>Small</span>
            <input type="checkbox" />
          </div>
          <div className={styles.checkbox}>
            <span>Mid</span>
            <input type="checkbox" />
          </div>
          <div className={styles.checkbox}>
            <span>Large</span>
            <input type="checkbox" />
          </div>
        </div>
        <button type='submit' className={styles.button}>
          Submit
        </button>
      </form>
      {/* <div onClick={toggleButton} style={{cursor: 'pointer'}}>

            <Image
      src={imgUrl}
      width={32}
      height={32}
      alt="toggle icon"
    />
      </div> */}
    </div>
  );
}

export default FilterBar;
