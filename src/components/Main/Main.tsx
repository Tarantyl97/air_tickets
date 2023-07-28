import React from "react";
import { useState } from "react";
import styles from './styles.module.scss';
import FlightDetails from "../FlightDetails/FlightDetails.tsx";
import { useSelector } from "react-redux";

interface MainProps {
  tickets : number
}

const Main = () => {
    const count = useSelector((state) => state)
    const [isChecked, setIsChecked] = useState(false);
    const [activeButton, setActiveButton] = useState('cheapest');
    const [tickets, setTickets] = useState(3)

    const handleChangeFilter = (buttonType) => {
      setActiveButton(buttonType)
    }

    const handleChange = () => {
      setIsChecked(!isChecked);
      console.log('hi')
    };

    const handleMoreTickets = () => {
      setTickets(prevTickets => prevTickets + 3)
    }

    // console.log(...MainProps)

    return (
        <div className={styles.main}>
            <div className={styles.mainChangeFlights}>
                <nav className={styles.mainChangeFlightsNav}>
                    <p>Количество пересадок</p>

                      <input
                      className={styles.mainChangeFlightsInput}
                      type="checkbox"
                      id="withouttransfer" 
                      name="withouttransfer" 
                      value="withouttransfer"
                      // checked={isChecked}
                      // onChange={handleChange}
                      />
                      <label htmlFor="withouttransfer">Без пересадок</label>

                      <input
                      className={styles.mainChangeFlightsInput}
                      type="checkbox"
                      id="1transplant" 
                      name="1transplant" 
                      value="1transplant"
                      // checked={isChecked}
                      // onChange={handleChange}
                      />
                      <label htmlFor="1transplant">1 Пересадка</label>

                        <input
                        className={styles.mainChangeFlightsInput}
                        type="checkbox"
                        id="2transplant" 
                        name="2transplant" 
                        value="2transplant"
                        // checked={isChecked}
                        // onChange={handleChange}
                        />
                        <label htmlFor="2transplant">2 Пересадки</label>

                        <input
                        className={styles.mainChangeFlightsInput}
                        type="checkbox"
                        id="3transplant" 
                        name="3transplant" 
                        value="3transplant"
                        // checked={isChecked}
                        // onChange={handleChange}
                        />
                        <label htmlFor="3transplant">3 Пересадки</label>

                </nav>
                <nav className={styles.mainChangeCompanyNav}>
                    <p>Компании</p>

                    <input
                    className={styles.mainChangeFlightsInputRadio}
                    type="checkbox"
                    id="Победа" 
                    name="Победа" 
                    value="Победа"
                    // checked={isChecked}
                    // onChange={handleChange}
                    />
                    <label htmlFor="Победа">Победа</label>

                    <input
                    className={styles.mainChangeFlightsInputRadio}
                    type="checkbox"
                    id="RedWings" 
                    name="RedWings" 
                    value="RedWings"
                    // checked={isChecked}
                    // onChange={handleChange}
                    />
                    <label htmlFor="RedWings">Red Wings</label>

                    <input
                    className={styles.mainChangeFlightsInputRadio}
                    type="checkbox"
                    id="S7Airlines" 
                    name="S7Airlines" 
                    value="S7Airlines"
                    // checked={isChecked}
                    // onChange={handleChange}
                    />
                    <label htmlFor="S7Airlines">S7 Airlines</label>
                </nav>
            </div>

            <div className={styles.mainInfoBlock}>
                <div className={styles.mainChangeFlightsFilters}>
                    <button
                    className={`${styles.mainChangeFlightsFiltersBtn}  ${
                    activeButton === "cheapest" ? styles.mainChangeFlightsFiltersBtnActive : ""
                    }`}
                    onClick={() => handleChangeFilter('cheapest')}
                    >
                        Самый дешевый</button>

                    <button
                    className={`${styles.mainChangeFlightsFiltersBtn}  ${
                    activeButton === "faster" ? styles.mainChangeFlightsFiltersBtnActive : ""
                    }`}
                    onClick={() => handleChangeFilter('faster')}
                    >Самый быстрый
                    </button>

                    <button
                    className={`${styles.mainChangeFlightsFiltersBtn}  ${
                    activeButton === "optimal" ? styles.mainChangeFlightsFiltersBtnActive : ""
                    }`}
                    onClick={() => handleChangeFilter('optimal')}
                    >Самый оптимальный
                    </button>

                </div>
                {[...Array(tickets)].map((_, index) => (
                  <FlightDetails key={index} tickets={tickets}/>
                ))}
              <button className={styles.mainMoreTicketsBtn}
              onClick={handleMoreTickets}
              >
              Загрузить еще билеты
              </button>
            </div>
        </div>
    )
}

export default Main;