import { ButtonHTMLAttributes, FunctionComponent } from "react";
import styles from "./styles.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};
