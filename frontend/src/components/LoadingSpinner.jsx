import "../css/LoadingSpinner.css";

export default function LoadingSpinner({ size = "medium" }) {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="loader"></div>
    </div>
  );
}
