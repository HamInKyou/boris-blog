export const getParametersForUnsplash = ({width, height, quality, format}: {
  width: number;
  height: number;
  quality: number;
  format: string;
}) => {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
}