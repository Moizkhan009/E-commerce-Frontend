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
  blue:       "#3B82F6",
  blueLight:  "#EFF6FF",
  purple:     "#8B5CF6",
  purpleLight:"#F5F3FF",
};

export const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

// Order status config — tera model: pending|processing|shipped|delivered|cancelled
export const STATUS = {
  pending:    { label:"Pending",    color:T.yellow, bg:T.yellowLight, icon:"🕐", step:0 },
  processing: { label:"Processing", color:T.blue,   bg:T.blueLight,   icon:"⚙️",  step:1 },
  shipped:    { label:"Shipped",    color:T.purple,  bg:T.purpleLight, icon:"🚚",  step:2 },
  delivered:  { label:"Delivered",  color:T.green,   bg:T.greenLight,  icon:"✅",  step:3 },
  cancelled:  { label:"Cancelled",  color:T.pink,    bg:T.pinkLight,   icon:"❌",  step:-1 },
};

export const fadeUp = (delay = 0) => ({
  animation: `fadeUp .5s cubic-bezier(.4,0,.2,1) ${delay}ms both`,
});