import useQuestionBox from "@/components/question-box";
import { Pressable, Text } from "react-native";

const data = "manas"
  .split("")
  .map((e) => ({ name: e, id: crypto.randomUUID() }));

export default function BoxPage() {
  const { QuestionBox, showQuestion } = useQuestionBox();

  const handleSubmit = () => {
    //setIsOpen(false);
    showQuestion("Do you want to submit", () => {
      console.log("hello hello");
    });
  };

  const handleDelete = () => {
    showQuestion(
      "Do you want to delete",
      () => {
        console.log("hey");
      },
      () => {
        console.log("you pressed no....");
      },
    );
  };

  let t = data.map((e) => <Text key={e.id}>{e.name}</Text>);

  return (
    <Pressable className={`flex-1 justify-center items-center`}>
      <Pressable
        className="mb-5 bg-blue-500 p-3 rounded-md"
        onPress={handleSubmit}
      >
        <Text className="text-white">Submit</Text>
      </Pressable>

      <Pressable
        className="mb-5 bg-blue-500 p-3 rounded-md"
        onPress={handleDelete}
      >
        <Text className="text-white">Delete</Text>
      </Pressable>
      {t}
    </Pressable>
  );
}

// function Box({
//   text,
//   handleSubmit,
//   handleYes,
// }: {
//   text: string;
//   handleSubmit: () => void;
//   handleYes: () => void;
// }) {
//   return (
//     <View className="bg-white shadow-md border-gray-50 w-96 h-44 p-4 rounded-md items-center absolute">
//       <Text className="text-3xl">?</Text>

//       <Text
//         className="text-lg mt-3 font-semibold text-center"
//         numberOfLines={2}
//       >
//         Are you sure you want to {text} it?
//       </Text>

//       <View className="flex-row mt-7 gap-x-5">
//         <Pressable
//           className="bg-green-600 p-2 w-16 rounded-md justify-center items-center"
//           onPress={handleYes}
//         >
//           <Text className="text-white">Yes</Text>
//         </Pressable>

//         <Pressable
//           className="bg-red-600 p-2 w-16 rounded-md justify-center items-center"
//           onPress={handleSubmit}
//         >
//           <Text className="text-white">No</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }
