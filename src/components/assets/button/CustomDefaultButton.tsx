import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import './CustomDefaultButton.css';

type CustomDefaultButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type CustomDefaultButtonPropsType = CustomDefaultButtonType & {
  onClick: () => void
  styleType?: string
}


export function CustomDefaultButton(props: CustomDefaultButtonPropsType) {
  
  return <button className={`default ${props.styleType && props.styleType}`} onClick={props.onClick} >{props.children}</button>
};
