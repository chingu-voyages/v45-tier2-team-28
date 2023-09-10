import React from "react";
import styles from "./styles/MeteorInfo.module.css";

function MeteorInfo() {
  return (
    <div className={styles.meteorInfoContainer}>
      <h3 className={styles.meteorInfoHeader}>What is a Meteor?</h3>
      <p className={styles.meteorInfoParagraph}>
        A meteor is the flash of light that we see in the night sky when a small
        chunk of interplanetary debris burns up as it passes through our
        atmosphere. The debris is known as a meteoroid, and the remnants of it
        that reach the Earth's surface are called meteorites.
      </p>

      <h4 className={styles.meteorInfoSubHeader}>Interesting Facts:</h4>
      <ul className={styles.meteorInfoList}>
        <li className={styles.meteorInfoListItem}>
          Meteoroids are typically fragments of comets and asteroids.
        </li>
        <li className={styles.meteorInfoListItem}>
          The speed at which meteoroids hit the Earth's atmosphere can range
          from 11 km/sec to 72 km/sec.
        </li>
        <li className={styles.meteorInfoListItem}>
          When meteoroids collide with the Earth's atmosphere at high speed and
          burn up, the fireballs or "shooting stars" are called meteors.
        </li>
        <li className={styles.meteorInfoListItem}>
          When a meteoroid survives its passage through the atmosphere and
          impacts the Earth, it is called a meteorite.
        </li>
      </ul>

      <h4 className={styles.meteorInfoSubHeader}>Size Classifications:</h4>
      <p className={styles.meteorInfoParagraph}>
        <span className={styles.meteorInfoStrong}>Small:</span> Less than 10
        grams
        <br />
        <span className={styles.meteorInfoStrong}>Medium:</span> Between 10
        grams to 2 kilograms
        <br />
        <span className={styles.meteorInfoStrong}>Large:</span> More than 2
        kilograms
      </p>

      <h4 className={styles.meteorInfoSubHeader}>
        Interesting Weight Comparisons:
      </h4>
      <p className={styles.meteorInfoItalicParagraph}>
        Picture one of these objects hurtling through the sky on fire!
      </p>

      <p className={styles.meteorInfoParagraph}>
        <span className={styles.meteorInfoStrong}>1 kg:</span> Your laptop
        <br />
        <span className={styles.meteorInfoStrong}>10 kg:</span> Bag of dogfood
        <br />
        <span className={styles.meteorInfoStrong}>50 kg:</span> 60" flatscreen
        TV
        <br />
        <span className={styles.meteorInfoStrong}>100 kg:</span> Standard
        refrigerator
        <br />
        <span className={styles.meteorInfoStrong}>500 kg:</span> Concert grand
        piano
        <br />
        <span className={styles.meteorInfoStrong}>1,000 kg:</span> 2016 Chevy
        Spark
        <br />
        <span className={styles.meteorInfoStrong}>5,000 kg:</span> Elephant
        <br />
        <span className={styles.meteorInfoStrong}>20,000 kg:</span> Fire truck
        (take a look at that iron meteorite in Sikhote-Alin - it's a monster of
        a meteor!)
      </p>
    </div>
  );
}

export default MeteorInfo;
