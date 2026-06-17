import { useDeferredValue, useMemo } from "react";

export default function BigList(props: { input: any }) {
  const size = 20000;

  const list = useMemo(() => {
    const l = [];
    const deferredValue = useDeferredValue(props.input);

    for (let i = 0; i < size; i++) {
      l.push(<div key={i}>{deferredValue}</div>);
    }

    return l;
  }, [props.input]);
  return list;
}
