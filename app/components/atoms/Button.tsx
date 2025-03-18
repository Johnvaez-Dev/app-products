import { Button as MuiButton, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

type Props = ButtonProps & { children: ReactNode };
const Button = ({ children, ...props }: Props) => <MuiButton {...props}>{children}</MuiButton>;
export default Button;