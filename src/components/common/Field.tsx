interface FieldProps {
  label: string;
  value?: string | number;
  children: React.ReactNode;
}

export function Field({ label, value, children }: FieldProps) {
  return (
    <label className="field-row">
      <span>
        {label}
        {value !== undefined ? <strong>{value}</strong> : null}
      </span>
      {children}
    </label>
  );
}
