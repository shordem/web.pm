function FormRow({ error, label, children }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold text-gray-600">{label}</label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default FormRow;
