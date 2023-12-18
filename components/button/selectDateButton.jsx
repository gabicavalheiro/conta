import React, { useState } from 'react';
import axios from 'axios';
import styles from './apiButton.module.css';

const ApiButton = () => {
 const [date, setDate] = useState(new Date());
 const [month, setMonth] = useState(date.getMonth() + 1);

 const fetchData = async () => {
    try {
      const monthString = month.toString().padStart(2, '0');
      const response = await axios.get(`https://api-conta-certa-production.up.railway.app/totalSaidas/21?mes=${monthString}&ano=${date.getFullYear()}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
 };

 const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
 };

 const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
 ];

 return (
    <div>
      <select value={month} onChange={handleMonthChange} className={styles.btn}>
        {months.map((month, index) => (
          <option key={index + 1} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <button onClick={fetchData}></button>
    </div>
 );
};

export default ApiButton;