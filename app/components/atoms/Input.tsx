import { TextField, TextFieldProps } from "@mui/material";

const Input = ({ label, ...props }: TextFieldProps) => <TextField label={label} fullWidth margin="normal" {...props} />;
export default Input;