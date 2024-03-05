/* eslint-disable react/prop-types */

const cn = ({ configStyles, styles, color, size }) => {
  return `${configStyles.base} ${configStyles.variants.color[color]} ${configStyles.variants.size[size]} ${styles}`;
};

const buttonStyle = {
  base: "rounded-md inline-block font-bold",
  variants: {
    color: {
      primary: "bg-sky-800 hover:bg-sky-600 duration-300 text-white",
      secondary: "bg-green-800 hover:bg-green-600 duration-300 text-white",
      danger: "bg-red-800 hover:bg-red-600 duration-300 text-white",
      indigo: "bg-indigo-800 hover:bg-indigo-600 duration-300 text-white",
    },
    size: {
      small: "px-3 py-1",
      medium: "px-4 py-2",
      large: "px-6 py-3",
    },
  },
};

export default function Button(props) {
  const { children, color, size, styles, onClick, type } = props;
  return (
    <button
      type={type}
      className={cn({ configStyles: buttonStyle, styles, color, size })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: "primary",
  size: "medium",
  style: "",
  type: "button",
};
