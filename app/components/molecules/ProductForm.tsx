import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface ProductFormProps {
    onSubmit: (product: any) => void;
    products: { code: number }[];
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, products }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [newProduct, setNewProduct] = useState({
        code: "",
        name: "",
        description: "",
        quantity: "",
        creation: null as Dayjs | null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date: Dayjs | null) => {
        setNewProduct({ ...newProduct, creation: date });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            ...newProduct,
            code: Number(newProduct.code),
            quantity: Number(newProduct.quantity),
            creation: newProduct.creation ? newProduct.creation.toISOString() : null,
        });

        setNewProduct({ code: "", name: "", description: "", quantity: "", creation: null });
    };

    if (!isClient) return null;

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Input label="Código" name="code" type="number" value={newProduct.code} onChange={handleChange} required autoComplete="off" />
            <Input label="Nombre" name="name" type="text" value={newProduct.name} onChange={handleChange} required autoComplete="off" />
            <Input label="Descripción" name="description" type="text" value={newProduct.description} onChange={handleChange} autoComplete="off" />
            <Input label="Cantidad" name="quantity" type="number" value={newProduct.quantity} onChange={handleChange} required autoComplete="off" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Creación"
                    value={newProduct.creation}
                    onChange={handleDateChange}
                    slotProps={{ textField: { fullWidth: true, autoComplete: "off" } }}
                />
            </LocalizationProvider>
            <br /><br />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" size="small">Guardar</Button>
            </div>
        </form>
    );
};

export default ProductForm;