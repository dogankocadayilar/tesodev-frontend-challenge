interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

function Button({ children, onClick, type, className, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#204080] hover:bg-[#4F75C2] focus:bg-[#4F75C2] font-sans  focus:outline-none text-white px-10 py-2 rounded-xl transition-colors active:bg-[#162b57]
      disabled:bg-gray-500 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
