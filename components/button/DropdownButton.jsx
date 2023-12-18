import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './Dropdown.module.css';

export default function DropdownButton({ toggleText, action1Text, action2Text, action1href, action2href, action3Text, action3href }) {

  const handleAction1Click = () => {
    // Redirecionar para a primeira URL
    window.location.href = action1href;
  };

  const handleAction2Click = () => {
    // Redirecionar para a segunda URL
    window.location.href = action2href;
  };
  const handleAction3Click = () => {
    // Redirecionar para a segunda URL
    window.location.href = action3href;
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className={styles.box}>
        {toggleText}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleAction1Click}>
          <span>{action1Text}</span>
        </Dropdown.Item>

        <Dropdown.Item onClick={handleAction2Click}>
          <span>{action2Text}</span>
        </Dropdown.Item>

        <Dropdown.Item onClick={handleAction3Click}>
          <span>{action3Text}</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
