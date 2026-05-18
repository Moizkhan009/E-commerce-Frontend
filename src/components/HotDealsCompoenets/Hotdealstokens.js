export const T = {
  green:      "#3BB77E",
  greenDark:  "#28976A",
  greenDeep:  "#1A6B4A",
  greenLight: "#E8F8F1",
  greenPale:  "#F2FBF6",
  navy:       "#1D3557",
  text:       "#4A5568",
  textLight:  "#8A9BAE",
  border:     "#E2ECE8",
  offWhite:   "#F8FAFC",
  pink:       "#E05C8A",
  pinkLight:  "#FFF0F5",
  yellow:     "#F6A623",
  yellowLight:"#FFF8EC",
};

export const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

export const fadeUp = (delay = 0) => ({
  animation: `fadeUp .5s cubic-bezier(.4,0,.2,1) ${delay}ms both`,
});