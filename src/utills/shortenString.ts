const shortenString = (input: string, length: number, position: "start" | "middle" | "end" = "end"): string => {
  if (input.length <= length) {
    return input;
  }

  switch (position) {
    case "start":
      return "..." + input.substring(input.length);
    case "middle":
      const frontChars = Math.ceil(length / 2);
      const backChars = length - frontChars;
      return input.substring(0, frontChars) + "..." + input.substring(input.length - backChars);
    case "end":
    default:
      return input.substring(0, length) + "...";
  }
};

export default shortenString;
