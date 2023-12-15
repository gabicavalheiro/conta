import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './Dropdown.module.css'

export default function DropdownButton({ toggleText, action1Text, action2Text, action1href, action2href, toggleHref }) {

 return (
    <Dropdown>
      
        <Dropdown.Toggle id="dropdown-basic" className={styles.box}>
          {toggleText}
        </Dropdown.Toggle>
      

      <Dropdown.Menu>
        <Link to={action1href}>
          <Dropdown.Item>
            <Nav.Link>{action1Text}</Nav.Link>
          </Dropdown.Item>
        </Link>

        <Link to={action2href}>
          <Dropdown.Item>
            <Nav.Link>{action2Text}</Nav.Link>
          </Dropdown.Item>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
 );
}