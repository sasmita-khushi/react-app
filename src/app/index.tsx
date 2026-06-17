import { useState } from "react";
import { Button, Text, View } from "react-native";
// export default function Index() {
//   const time = useTimer();
//   const time2 = useTimer();

//   return (
//     <View style={styles.container}>
//       <Text className=" text-white bg-yellow-700 p-8 rounded-xl">{time}</Text>
//       <Link href="/hello">Go to hello</Link>
//       <Text>{time2}</Text>
//     </View>
//   );
// }

// function useTimer() {
//   const [time, setTime] = useState(new Date());
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);
//     return () => {
//       console.log("clearing...");
//       clearInterval(interval);
//     };
//   }, []);
//   return time.toLocaleTimeString();
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default function hello() {
  const { count, increment, decrement } = useCounter();

  return (
    <View>
      <Text>Count:{count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
}
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return { count, increment, decrement };
}
