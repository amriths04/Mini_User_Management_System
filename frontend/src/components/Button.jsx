import "../css/Button.css";
import LoadingSpinner from "./LoadingSpinner";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <LoadingSpinner size="small" /> : children}
    </button>
  );
}
