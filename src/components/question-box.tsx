import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function useQuestionBox() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const yesRef = useRef<(() => void) | null>(null);
  const noRef = useRef<(() => void) | null>(null);

  const showQuestion = (
    title: string,
    onYes: () => void,
    onNo?: () => void,
  ) => {
    yesRef.current = null;
    noRef.current = null;
    setTitle(title);
    setVisible(true);
    yesRef.current = onYes;

    if (onNo) {
      noRef.current = onNo;
    }
  };

  const handleYes = () => {
    setVisible(false);
    if (yesRef.current) {
      yesRef.current();
    }
  };
  const handleNo = () => {
    setVisible(false);
    if (noRef.current) {
      noRef.current();
    }
  };
  return {
    showQuestion,
    QuestionBox: () => {
      if (visible) {
        return (
          <View className="bg-white shadow-md border-gray-50 w-96 h-44 p-4 rounded-md items-center absolute">
            <Text className="text-3xl">?</Text>
            <Text
              className="text-lg mt-3 font-semibold text-center"
              numberOfLines={2}
            >
              {title}
            </Text>
            <TextInput />
            <View className="flex-row mt-7 gap-x-5">
              <Pressable
                onPress={handleYes}
                className="bg-green-600 p-2 w-16 rounded-md justify-center items-center"
              >
                <Text className="text-white">Yes</Text>
              </Pressable>
              <Pressable
                onPress={handleNo}
                className="bg-red-600 p-2 w-16 rounded-md justify-center items-center"
              >
                <Text className="text-white">No</Text>
              </Pressable>
            </View>
          </View>
        );
      }
    },
  };
}
