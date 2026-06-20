import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useRef, useState } from "react";

type DropDownProps<T> = {
  data: T[];
  placeholder: string;
  value?: T;
  onSelect: (value: T) => void;
  id: keyof T;
  propsToBind: keyof T;
  reset: boolean;
};

export default function DropDown<T extends Record<string, any>>(
  props: DropDownProps<T>,
) {
  const [openBox, setOpenBox] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(props.value);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenBox = () => {
    setOpenBox((prev) => !prev);
  };

  const handleSelect = useCallback(
    (value: T) => {
      setSelected(value);
      setOpenBox(false);
      props.onSelect(value);
    },
    [props.onSelect],
  );

  useEffect(() => {
    setSelected(props.value);
  }, [props.value]);

  useEffect(() => {
    function listener(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpenBox(false);
      }
    }

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, []);

  useEffect(() => {
    if (props.reset) {
      setSelected(undefined);
    }
  }, [props.reset]);
  return (
    <div ref={containerRef}>
      <div className="relative w-52">
        <div
          onClick={handleOpenBox}
          className="border border-gray-700 rounded-lg p-3 w-full cursor-pointer flex justify-between items-center hover:border-blue-500 "
        >
          <span
            className={
              selected?.[props.propsToBind] ? "text-black" : "text-gray-400"
            }
          >
            {selected?.[props.propsToBind]
              ? String(selected[props.propsToBind])
              : props.placeholder}
          </span>

          <Ionicons
            name={openBox ? "caret-up-outline" : "caret-down-outline"}
            size={20}
            color="black"
          />
        </div>

        <Box
          openBox={openBox}
          id={props.id}
          propsToBind={props.propsToBind}
          data={props.data}
          handleSelect={handleSelect}
        />
      </div>
    </div>
  );
}

type BoxProps<T> = {
  openBox: boolean;
  handleSelect: (value: T) => void;
  data: T[];
  propsToBind: keyof T;
  id: keyof T;
};

function Box<T extends Record<string, any>>({
  openBox,
  handleSelect,
  propsToBind,
  id,
  data,
}: BoxProps<T>) {
  if (!openBox) return null;

  return (
    <div className="absolute shadow-md left-0 bg-gray-100 w-full rounded-md mt-1 z-50">
      {data.map((data) => (
        <div
          key={String(data[id])}
          className="p-2 px-5 border-b border-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={() => {
            handleSelect(data);
          }}
        >
          {data[propsToBind]}
        </div>
      ))}
    </div>
  );
}
