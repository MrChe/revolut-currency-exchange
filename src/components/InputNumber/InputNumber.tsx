import React from "react";

import styles from "./InputNumber.module.scss";

interface InputNumberProps {
  value?: string | number | undefined;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const InputNumber = (props: InputNumberProps): JSX.Element => {
  return (
    <input
      className={styles.InputNumber}
      type="text"
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
    />
  );
};
