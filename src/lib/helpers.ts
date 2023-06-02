export const trimCopy = (copy: string, maxLength: number) => {
  const trimmedCopy = copy && copy.substr(0, maxLength);

  if (copy && copy.length <= maxLength) {
    return copy;
  }

  return (
    trimmedCopy && `${trimmedCopy.substr(0, Math.min(trimmedCopy.length, trimmedCopy.lastIndexOf(' '))).trim()}...`
  );
};
