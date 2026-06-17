import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";

type AutoCompleteType<T> = {
  data: T[];
  placeholder: string;
  value?: T;
  onChange?: (value: T | null) => void;
};

export default function AutoComplete<T extends string>(
  props: AutoCompleteType<T>,
) {
  const [openBox, setOpenBox] = useState(false);
  const [selected, setSelected] = useState<T | null>(props.value ?? null);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredData = props.data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenBox = () => {
    setOpenBox((prev) => !prev);
  };

  const handleSelect = (item: T) => {
    setSelected(item);
    setSearch(item);
    setOpenBox(false);
    if (props.onChange) props.onChange(item);
  };

  const handleReset = () => {
    setSelected(null);
    setSearch("");
  };

  const handleKeyDown = (event: any) => {
    // console.log(event.key);
    if (event.key === "Escape") {
      setOpenBox(false);
    }

    if (event.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev === filteredData.length - 1 ? 0 : prev + 1,
      );
    }

    if (event.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === 0 ? filteredData.length - 1 : prev - 1,
      );
    }

    if (event.key === "Enter") {
      const item = filteredData[highlightedIndex];

      if (item) {
        setSelected(item);
        setSearch(item);
        setOpenBox(false);
      }
    }
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search]);

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

  return (
    <div className="mt-6 ml-10">
      <div ref={containerRef} className="relative w-96 ">
        <input
          value={search}
          onKeyDown={handleKeyDown}
          placeholder={props.placeholder}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={handleOpenBox}
          className="border border-gray-700 rounded-lg p-3 h-16 w-full"
        />
        {selected && (
          <Ionicons
            name="close-outline"
            size={28}
            color="gray"
            style={{
              position: "absolute",
              right: 45,
              top: 15,
              cursor: "pointer",
            }}
            onClick={handleReset}
          />
        )}

        <Ionicons
          name="caret-down"
          size={20}
          style={{
            position: "absolute",
            right: 25,
            top: 20,
          }}
        />
        <Box
          openBox={openBox}
          data={filteredData}
          onSelect={handleSelect}
          highlightedIndex={highlightedIndex}
        />
      </div>
    </div>
  );
}

type BoxType<T> = {
  openBox: boolean;
  data: T[];
  onSelect: (value: T) => void;
  highlightedIndex: number;
};

function Box<T extends string>(props: BoxType<T>) {
  if (!props.openBox) return null;

  return (
    <div className="absolute shadow-md left-0 bg-gray-100 w-full rounded-md mt-1 z-50">
      {props.data.map((data, i) => (
        <div
          key={i}
          onClick={() => props.onSelect(data)}
          className={`p-2 px-5 border-b border-gray-200 cursor-pointer ${
            i === props.highlightedIndex ? "bg-blue-200" : "hover:bg-gray-300"
          }`}
        >
          {data}
        </div>
      ))}
    </div>
  );
}
