interface OrderSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

function OrderSelect({ value, onChange }: OrderSelectProps) {
  return (
    <select
      name="selectedOrder"
      defaultValue="nasc"
      value={value}
      onChange={onChange}
      className="h-fit p-2 border-2 outline-none border-gray-400 rounded-xl font-semibold"
    >
      <option value="nasc">Name Ascending</option>
      <option value="ndesc">Name Descending</option>
      <option value="casc">Company Ascending</option>
      <option value="cdesc">Company Descending</option>
    </select>
  );
}

export default OrderSelect;
