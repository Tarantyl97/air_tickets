import React from "react";
import { useState } from "react";
import styles from './styles.module.css';
import FlightDetails from "../FlightDetails/FlightDetails.tsx";
import { useSelector } from "react-redux";

interface commonProps {
  tickets: number,
  activeButton : string,
  faster: string [],
  sortedPrice: number [],
  selectedAirline: string [],
  sortedDate: string [],
  setIdState: number[],
  cheaper: number[]
}

const Main = (): JSX.Element => {
    const data = useSelector((state: FlightDetails) => state);

    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [tickets, setTickets] = useState<number>(3);
    const [faster, setFaster] = useState<string[] | null>([]);
    const [cheaper, setCheaper] = useState<number[] | null>([]);
    const [idState, setIdState] = useState<number[]>([]);

    const sortedDurations = data.duration;
    const cheapest = [...data.price];

    const [sortedDate, setSortedDate] = useState([]);
    const [selectedAirline, setSelectedAirline] = useState<string[]>([]);
    const [sortedPrice, setSortedPrice] = useState([]);

    const sort: FlightDetails = {
      id: data.id,
      from: data.from,
      to: data.to,
      company: data.company,
      company_url: data.company_url,
      price: [...data.price],
      currency: data.currency,
      time: data.time,
      duration: data.duration,
      date: data.date,
      connectionAmount: data.connectionAmount,
    }

    const getPriceByDuration = (durations: any) => {
      const index = sortedDurations.indexOf(durations);
      if (index !== -1) {
        return {
          price: sort.price[index],
          airline: sort.company_url[index],
          date: sort.date[index],
          id: sort.id[index],
        };
      }
      return null;
    };
    
    const handleChangeFilter = (buttonType: string) => {
      setActiveButton(buttonType);
    
      if (buttonType === 'faster') {
        const newSortedDurations = [...sortedDurations].sort();
        setFaster(newSortedDurations);
    
        const newPrices = [];
        const newAirlines = [];
        const newDates = [];
        const newIds = [];
    
        for (const dur of newSortedDurations) {
          const result = getPriceByDuration(dur);
          if (result) {
            newPrices.push(result.price);
            newAirlines.push(result.airline);
            newDates.push(result.date);
            newIds.push(result.id);
          }
        }
    
        setSortedPrice(newPrices);
        setSelectedAirline(newAirlines);
        setSortedDate(newDates);
        setIdState(newIds);
      } else {
        setFaster([...sortedDurations].sort((a, b) => 0));
        setIdState(data.id);
      }
    
      if (buttonType === 'cheapest') {
        setCheaper([...cheapest].sort((a, b) => a - b));
      } else {
        setCheaper([...cheapest].sort((a, b) => 0));
      }
    };

    const handleMoreTickets = () => {
      setTickets((prevTickets) => prevTickets + 2 )
    }

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
                      />
                      <label htmlFor="withouttransfer">Без пересадок</label>

                      <input
                      className={styles.mainChangeFlightsInput}
                      type="checkbox"
                      id="1transplant" 
                      name="1transplant" 
                      value="1transplant"
                      />
                      <label htmlFor="1transplant">1 Пересадка</label>

                        <input
                        className={styles.mainChangeFlightsInput}
                        type="checkbox"
                        id="2transplant" 
                        name="2transplant" 
                        value="2transplant"
                        />
                        <label htmlFor="2transplant">2 Пересадки</label>

                        <input
                        className={styles.mainChangeFlightsInput}
                        type="checkbox"
                        id="3transplant" 
                        name="3transplant" 
                        value="3transplant"
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
                    />
                    <label htmlFor="Победа">Победа</label>

                    <input
                    className={styles.mainChangeFlightsInputRadio}
                    type="checkbox"
                    id="RedWings" 
                    name="RedWings" 
                    value="RedWings"
                    />
                    <label htmlFor="RedWings">Red Wings</label>

                    <input
                    className={styles.mainChangeFlightsInputRadio}
                    type="checkbox"
                    id="S7Airlines" 
                    name="S7Airlines" 
                    value="S7Airlines"
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

                  <FlightDetails tickets={tickets} activeButton={activeButton}
                  faster={faster} sortedPrice={sortedPrice} selectedAirline={selectedAirline}
                   sortedDate={sortedDate} setIdState={setIdState} cheaper={cheaper}
                  />
                  {/* <FlightDetails {...commonProps} /> */}

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


    // const getPriceByDuration = (durations: any) => {
    //   const index = sortedDurations.indexOf(durations);
    //   if (index !== -1) {
    //     setSortedPrice(prices)
    //     setSelectedAirline(airlines)
    //     setSortedDate(sortedDates)
    //     setIdState(idT)
    //     prices.push(sort.price[index])
    //     idT.push(sort.id[index])
    //     sortedDates.push(sort.date[index])
    //     airlines.push(sort.company_url[index])

    //     return;
    //   }
    //   return null;
    // };
    
    // const handleChangeFilter = (buttonType: string) => {
    //   setActiveButton(buttonType)

    //   if (buttonType === 'faster') {
    //     sortedDurations.sort();
    //     setFaster([...sortedDurations]);
    //     for (const dur of faster ) {
    //       const p = getPriceByDuration(dur);
    //     }
    //   } else {
    //     setFaster(sortedDurations.sort((a, b) => 0));
    //     setIdState(data.id)
    //   }

    //   if(buttonType === 'cheapest') {
    //     setCheaper(cheapest.sort((a, b) => a - b))
    //   } else {
    //     setCheaper(cheapest.sort((a, b) => 0))
    //   }
    // }