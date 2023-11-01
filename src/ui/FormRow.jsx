function FormRow({ error, label, children }) {
  //     border: 1px solid var(--color-grey-300);
  //   background-color: var(--color-grey-0);
  //   border-radius: var(--border-radius-sm);
  //   padding: 0.8rem 1.2rem;
  //   box-shadow: var(--shadow-sm);

  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold text-gray-600">{label}</label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default FormRow;
