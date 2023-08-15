import React, { useState, useEffect } from "react";
import Image from 'next/image';

function FilterBar() {
    const imgUrl = "https://img.icons8.com/?size=512&id=20006&format=png";
    return (
        <div style={{ display: "flex" }}>
            <h1>FireBall</h1>
            <form id='filter-bar-form'>
                <input type="text" />
                <button>Search</button>
            </form>
            <Image
      src={imgUrl}
      width={32}
      height={32}
      alt="toggle icon"
    />
        </div>
    )
}

export default FilterBar;