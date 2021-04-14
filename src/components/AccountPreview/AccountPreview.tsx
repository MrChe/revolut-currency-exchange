import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
// import { useStore } from "../../models/connect";

import styles from "./AccountPreview.module.scss";

export const AccountPreview = observer(function Dashboard(): JSX.Element {
  return <div className={styles.AccountPreview}>AccountPreview</div>;
});
