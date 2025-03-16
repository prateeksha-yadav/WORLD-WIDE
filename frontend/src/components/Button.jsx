import styles from "./Button.module.css";

function Button({ children, onClick, type, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
