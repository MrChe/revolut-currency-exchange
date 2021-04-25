import React from "react";
import cn from "classnames";

import styles from "./Button.modules.scss";

interface IButtonProps {
  children: JSX.Element | string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "circle" | "normal";
  bg?: "transparent" | "white" | "black";
  name: string;
}

export const Button = (props: IButtonProps): JSX.Element => {
  return (
    <button
      aria-label={props.name}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn({
        [styles.Button]: true,
        [styles.Circle]: props.type === "circle",
        [styles.Bg_Type_White]: props.bg === "white",
        [styles.Bg_Type_Black]: props.bg === "black",
        [styles.State_Disabled]: props.disabled,
      })}
    >
      {props.children}
    </button>
  );
};
