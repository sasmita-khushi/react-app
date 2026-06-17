type ButtonType = {
  text: string;
  variant: "Plain" | "Filled" | "Outlined" | "Disable";
  onClick: () => void;
};

export default function Button(props: ButtonType) {
  let buttonStyle = "";

  switch (props.variant) {
    case "Plain":
      buttonStyle = "hover:bg-gray-100";
      break;

    case "Filled":
      buttonStyle = "bg-blue-500 text-white";
      break;

    case "Disable":
      buttonStyle = "bg-gray-300  text-gray-500";
      break;

    case "Outlined":
      buttonStyle = "border border-gray-500";
      break;
  }

  return (
    <div className="flex justify-center items-center">
      <div
        onClick={props.onClick}
        className={`
          p-2 w-36 mt-10 rounded-md cursor-pointer text-center
          transition-transform duration-150
          active:scale-95
          ${buttonStyle}
        `}
      >
        {props.text}
      </div>
    </div>
  );
}
