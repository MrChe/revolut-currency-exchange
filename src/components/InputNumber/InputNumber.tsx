import React from "react";

import styles from "./InputNumber.module.scss";

interface InputNumberProps {
  sign?: "-" | "+";
  value?: string | number | undefined;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const InputNumber = (props: InputNumberProps): JSX.Element => {
  return (
    <div className={styles.InputNumber}>
      <span className={styles.Sign}>{props.sign}</span>
      <input
        className={styles.Input}
        type="text"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
      />
    </div>
  );
};
