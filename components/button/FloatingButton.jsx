import React from 'react';
import styles from './FloatingButton.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

const FloatingButton = ({ usuarioId }) => {
  return (
    <div className={styles.floatingButton}>
      <Link href={{ pathname: '/Adicionar-conta', query: { usuarioId } }}>
        <div className={styles.button}>
          <i className="bi bi-plus"></i>
        </div>
      </Link>
    </div>
  );
};

export default FloatingButton;
