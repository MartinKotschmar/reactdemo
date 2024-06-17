import React from "react";
import Logo from "../../../public/react-logo.svg";
import * as styles from "./Home.module.css";

const Home: React.FC = () => {
  //only static example data for profile
  return (
    <div className={styles.container}>
      <h2>Homepage</h2>
      <div className={styles.titleContainer}>
        <div className={styles.name}>
          <h2>Martin Kotschmar</h2>
        </div>
        <div className={styles.image}>
          <img src={Logo} alt={"react logo"} height={50} width={50} />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div>
        <span className={styles.title}>Technische Erfahrung</span>
        <p>Frontend-Entwicklung im Bereich React, (Next), React-Native.</p>
      </div>
      <div>
        <span className={styles.title}>Geräte</span>
        <p>Entwicklung für eReader, Web, Tablet, Mobile (iOS, Android)</p>
      </div>
      <div>
        <span className={styles.title}>Ausbildung</span>
        <p>BA-Dresden, Fach: Medieninformatik</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea
      </p>
    </div>
  );
};

export default Home;
