import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Filterbar.module.css";

function FilterBar(props) {
  const imgUrl = "https://img.icons8.com/?size=512&id=20006&format=png";
  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={props.submit}
        className={styles.form}
        id="filter-bar-form"
      >
        <input onChange={props.updateName} placeholder="Name" type="text" value={props.name} />
        <div>
          <label for="year-strike">Year</label>
          <input onChange={props.updateYear} type="number" min={1000} max={3000} id="year-strike" value={props.year} />
        </div>
        <div>
          <label for="class-type">Class</label>
          <input onChange={props.updateType} typ="text" id="class-type" value={props.type} />
        </div>
        <div className={styles.range}>
          <label for="mass-range">Mass Range</label>
          <div className={styles.checkbox}>
            <span>Small</span>
            <input onChange={props.updateSelected} name="small" checked={props.mass.small} type="radio" value="0-1000"/>
          </div>
          <div className={styles.checkbox}>
            <span>Mid</span>
            <input onChange={props.updateSelected} name="mid" checked={props.mass.mid} type="radio" value="1000-10000"/>
          </div>
          <div className={styles.checkbox}>
            <span>Large</span>
            <input onChange={props.updateSelected} name="large" checked={props.mass.large} type="radio" value="10000-1000000"/>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <button type="button" onClick={props.clear} className={styles.button}>
          Clear
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
