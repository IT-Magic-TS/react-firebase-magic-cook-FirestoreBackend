export default function ErrorMessage({ error }) {
  return (
    <div className="w3-panel w3-red w3-margin w3-padding">
      <h3>Danger!</h3>
      <p>{error}</p>
    </div>
  );
}
