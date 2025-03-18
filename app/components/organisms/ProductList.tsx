import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Checkbox,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface Product {
    code: number;
    name: string;
    description: string;
    quantity: number;
    creation: string;
}

interface ProductListProps {
    products: Product[];
    onDelete: (codes: number[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const handleSelectProduct = (code: number) => {
        setSelectedProducts((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );
    };

    const handleDeleteClick = (code?: number) => {
        if (code !== undefined) {
            setProductToDelete(code);
            setSelectedProducts([]);
        } else {
            setProductToDelete(null);
        }
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        const codesToDelete = productToDelete !== null ? [productToDelete] : selectedProducts;
        onDelete(codesToDelete);
        setSelectedProducts([]);
        setProductToDelete(null);
        setOpen(false);
    };

    return (
        <>
            {products.length === 0 ? (
                <Alert severity="warning">No hay productos disponibles</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seleccionar</TableCell>
                                <TableCell>Código</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Creación</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.code}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedProducts.includes(product.code)}
                                            onChange={() => handleSelectProduct(product.code)}
                                        />
                                    </TableCell>
                                    <TableCell>{product.code}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{new Date(product.creation).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteClick(product.code)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                    variant="contained"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick()}
                    disabled={selectedProducts.length === 0}
                >
                    Eliminar seleccionados
                </Button>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    {productToDelete !== null ? (
                        <>¿Estás seguro de que quieres eliminar el producto <strong>{products.find(p => p.code === productToDelete)?.name}</strong>?</>
                    ) : (
                        <>
                            ¿Estás seguro de que quieres eliminar los siguientes productos?
                            <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                                {products.filter(p => selectedProducts.includes(p.code)).map((product) => (
                                    <Box component="li" key={product.code}>{product.name}</Box>
                                ))}
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductList;
