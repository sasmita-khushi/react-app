import Button from "@/components/button";

export default function ButtonPage() {
  return (
    <div>
      <Button
        text="Plain"
        variant="Plain"
        onClick={() => console.log("Plain clicked")}
      />

      <Button
        text="Contained"
        variant="Filled"
        onClick={() => console.log("Contained clicked")}
      />

      <Button
        text="Outline"
        variant="Outlined"
        onClick={() => console.log("Outline clicked")}
      />

      <Button
        text="Disable"
        variant="Disable"
        onClick={() => console.log("Disable clicked..")}
      />
    </div>
  );
}
