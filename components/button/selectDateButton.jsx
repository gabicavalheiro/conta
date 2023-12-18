import React, { useState } from 'react';
import axios from 'axios';
import styles from './apiButton.module.css'

const ApiButton = () => {
 const [date, setDate] = useState(new Date());

 const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.example.com/data?date=${date.toISOString()}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
 };

 const changeDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
 };

 return (
    <div>
      <button className={styles.btn} onClick={() => {changeDate(); fetchData();}}>
        <i className={`bi bi-arrow-left-circle ${styles.icon}`}></i>
      </button>
    </div>
 );
};

export default ApiButton;