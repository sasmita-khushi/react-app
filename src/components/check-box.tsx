import Ionicons from "@expo/vector-icons/Ionicons";

type CheckBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function CheckBox({ checked, onChange }: CheckBoxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`h-6 w-6 rounded-sm flex items-center justify-center ${
        checked ? "bg-blue-600" : "border-2 border-gray-800"
      }`}
    >
      {checked && <Ionicons name="checkmark-outline" size={22} color="white" />}
    </button>
  );
}
