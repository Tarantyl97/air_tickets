import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { useSelector, useDispatch } from "react-redux";

interface FlightDetails {
    id: number,
    from: string | null,
    to: string | null,
    company: string[],
    company_url: string[],
    price: number[],
    currency: string,
    time: number,
    duration: number,
    date: number,
    connectionAmount: any[]
}

interface commonProps {
    tickets: number,
    activeButton : string,
    faster: string [],
    sortedPrice: number [],
    selectedAirline: string []
    sortedDate: string [],
    setIdState: number [],
    cheaper: number[]
  }

const FlightDetails = (props: commonProps): JSX.Element => {

const dispatch = useDispatch();
const data = useSelector((state: FlightDetails) => state);
const durations = useSelector((state: FlightDetails) => state.duration);

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    function formatTime(hours, minutes) {
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        return `${formattedHours}:${formattedMinutes}`;
    }

    function getRandomDuration() {
        const minMinutes = 1;
        const maxMinutes = 600;
        const numDurations = 5;
        const intervalHours = 1;
    
        const randomDurations: string[] = [];
        const randomDates: string[] = [];

        let departureTime = new Date();
        departureTime.setHours(12, 0, 0, 0);
    
        for (let i = 0; i < numDurations; i++) {
          const randomMinutes = getRandomNumber(minMinutes, maxMinutes);
          const hours = Math.floor(randomMinutes / 60);
          const minutes = randomMinutes % 60;
          randomDurations.push(`${hours}ч ${minutes}мин`);
    
          const arrivalTime = new Date(departureTime.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
          randomDates.push(`${formatTime(departureTime.getHours(), departureTime.getMinutes())} - ${formatTime(arrivalTime.getHours(), arrivalTime.getMinutes())}`);
    
          departureTime = new Date(departureTime.getTime() + intervalHours * 60 * 60 * 1000);
        }
    
        return { randomDurations, randomDates };
      }

      useEffect(() => {
          const { randomDurations, randomDates } = getRandomDuration();
          dispatch({ type: "ADD_DURATION", payload: randomDurations });
          dispatch({ type: "ADD_DATE", payload: randomDates });
        }, [dispatch]);

    useEffect(() => {
        const newIds: number[] = [];
        const getId = (tickets) => {
          for (let i = 0; i < tickets; i++) {
            newIds.push(i);
            props.setIdState(newIds)
          }
          dispatch({ type: "ADD_ID", payload: newIds});
        };
        getId(props.tickets);
      }, [props.tickets]);

    return (
        <>
        {props.activeButton === 'faster' && data !== null ? (
            data !== null && data?.price ? (
                data?.duration?.slice(0, props.tickets).map((item, index) => (
                        <div 
                        key={index}
                        className={styles.flightInfo}
                        >
                        <div className={styles.flightInfoPrice}>
                                <p>{props.activeButton === 'faster' ? `${props.sortedPrice[index]} ${data?.currency}` : ''}</p>
                                <p>{props.activeButton === 'cheaper' ? `${props.cheaper[index]} ${data?.currency}` : ''}</p>
                            <img 
                            className={styles.flightInfoCompanyLogo} 
                            src={props.selectedAirline[index]} 
                            >
                            </img>
                        </div>
                        <div className={styles.flightInfoAboutFlight}>
                            <div className={styles.flightInfoAirportAndTime}>
                                <p className={styles.flightInfoTitle}>{data?.from} - {data?.to}</p>
                                <p className={styles.flightInfoValue}>{props.sortedDate[index]}</p>
                            </div>
                            <div className={styles.flightInfoDuration}>
                                <p className={styles.flightInfoTitle}>В пути</p>
                                    <p key={index} className={styles.flightInfoValue}>{props.faster[index]}</p>
    
                            </div>
                            <div className={styles.flightInfoTransfer}>
                                    <p className={styles.flightInfoTitle}>Пересадки</p>
                                <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 0 ? 'Без пересадок' : ' '}</p>
                                <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 1 ? '1 Пересадка' : ' '}</p>
                                <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 2 ? '2 Пересадки' : ' '}</p>
                                <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 3 ? '3 Пересадки' : ' '}</p>
                            </div>
                        </div>
                    </div>
                    ))) : ''
        ) : (
        data !== null && data?.price ? (
            data?.price?.slice(0, props.tickets).map((item, index) => (
                    <div 
                    key={index}
                    className={styles.flightInfo}
                    >
                    <div className={styles.flightInfoPrice}>
                            <p>{item} {data?.currency}</p>
                        <img src={data?.company_url[index]} className={styles.flightInfoCompanyLogo}></img>
                    </div>
                    <div className={styles.flightInfoAboutFlight}>
                        <div className={styles.flightInfoAirportAndTime}>
                            <p className={styles.flightInfoTitle}>{data?.from} - {data?.to}</p>
                            <p className={styles.flightInfoValue}>{data?.date[index]}</p>
                        </div>
                        <div className={styles.flightInfoDuration}>
                            <p className={styles.flightInfoTitle}>В пути</p>

                                <p key={index} className={styles.flightInfoValue}>{durations[index]}</p>

                        </div>
                        <div className={styles.flightInfoTransfer}>
                                <p className={styles.flightInfoTitle}>Пересадки</p>
                            <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 0 ? 'Без пересадок' : ' '}</p>
                            <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 1 ? '1 Пересадка' : ' '}</p>
                            <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 2 ? '2 Пересадки' : ' '}</p>
                            <p className={styles.flightInfoValue}>{data?.connectionAmount[index] === 3 ? '3 Пересадки' : ' '}</p>
                        </div>
                    </div>
                </div>
                ))) : '')}
            </>
    )
}

export default FlightDetails;