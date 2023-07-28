import React, { useEffect } from "react";
import styles from './styles.module.scss';
import { useSelector, useDispatch } from "react-redux";

// interface MainProps {
//     tickets : number
// }


const FlightDetails = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state)
    const company = useSelector(state => state.company)

    const generateRandomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
      const randomNumbers = [];
      const min = 5000;
      const max = 150000;

    useEffect(() => {
    
        // Генерируем 10 случайных чисел и добавляем их в массив randomNumbers
        for (let i = 0; i < 10; i++) {
          randomNumbers.push(generateRandomNum(min, max));
        }
    
        // Отправляем массив randomNumbers в хранилище Redux с помощью dispatch
        dispatch({ type: "ADD_PRICE", payload: randomNumbers });
      }, []);



    console.log(randomNumbers)

    return (
        <>
        {data !== null && data.price ? (
            data?.price?.map((item, index) =>(
                    <div className={styles.flightInfo}>
                    <div className={styles.flightInfoPrice}>
                            <p>{item}</p>
                        <img className={styles.flightInfoCompanyLogo}></img>
                    </div>
                    <div className={styles.flightInfoAboutFlight}>
                        <div className={styles.flightInfoAirportAndTime}>
                            <p className={styles.flightInfoTitle}>Airport</p>
                            <p className={styles.flightInfoValue}>time</p>
                        </div>
                        <div className={styles.flightInfoDuration}>
                            <p className={styles.flightInfoTitle}>В пути</p>
                            <p className={styles.flightInfoValue}>Duration</p>
                        </div>
                        <div className={styles.flightInfoTransfer}>
                            <p className={styles.flightInfoTitle}>Пересадки</p>
                            <p className={styles.flightInfoValue}>Current</p>
                        </div>
                    </div>
                </div>
                ))
        ) : (
        <div className={styles.flightInfo}>
                    <div className={styles.flightInfoPrice}>
                            <p>price</p>
                        <img className={styles.flightInfoCompanyLogo}></img>
                    </div>
                    <div className={styles.flightInfoAboutFlight}>
                        <div className={styles.flightInfoAirportAndTime}>
                            <p className={styles.flightInfoTitle}>Airport</p>
                            <p className={styles.flightInfoValue}>time</p>
                        </div>
                        <div className={styles.flightInfoDuration}>
                            <p className={styles.flightInfoTitle}>В пути</p>
                            <p className={styles.flightInfoValue}>Duration</p>
                        </div>
                        <div className={styles.flightInfoTransfer}>
                            <p className={styles.flightInfoTitle}>Пересадки</p>
                            <p className={styles.flightInfoValue}>Current</p>
                        </div>
                    </div>
                </div>
                )}
            </>
    )
}

export default FlightDetails;