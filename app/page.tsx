"use client";

import { useState } from "react";
import {
    AppBar,
    Box,
    Drawer,
    Toolbar,
    Typography,
    Modal,
    CssBaseline,
    IconButton,
    Fab,
    Snackbar,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "../app/components/molecules/ProductForm";
import ProductList from "../app/components/organisms/ProductList";
import Filters from "../app/components/molecules/Filters";

const Home = () => {
    const drawerWidth = 250;
    const [products, setProducts] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [sortField, setSortField] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAddProduct = (product: any) => {
        if (products.some((p) => p.code === product.code)) {
            setAlertOpen(true);
            return;
        }
        setProducts([...products, { ...product, id: Date.now(), code: Number(product.code), quantity: Number(product.quantity), creation: new Date(product.creation) }]);
        setOpenModal(false);
    };

    const handleDeleteProducts = (codes: number[]) => {
        setProducts((prevProducts) => prevProducts.filter((p) => !codes.includes(p.code)));
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (!sortField) return 0;
        if (sortField === "creation") {
            return new Date(a.creation).getTime() - new Date(b.creation).getTime();
        }
        if (sortField === "code" || sortField === "quantity") {
            return Number(a[sortField]) - Number(b[sortField]);
        }
        return a[sortField].localeCompare(b[sortField]);
    });

    return (
        <Box sx={{ display: "flex", height: "100vh", padding: 2 }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, paddingX: 2 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        App Productos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", padding: 2 },
                }}
            >
                <Toolbar />
                <Typography variant="h6">Filtros</Typography>
                <Filters sortField={sortField} onSortChange={setSortField} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
                <Box sx={{ padding: 3, borderRadius: 2 }}>
                    <Typography variant="h6">Listar Productos</Typography>
                    <br />
                    <ProductList products={sortedProducts} onDelete={handleDeleteProducts} />
                </Box>
            </Box>
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={() => setOpenModal(true)}
            >
                <AddIcon />
            </Fab>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Crear Producto</Typography>
                        <IconButton onClick={() => setOpenModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <ProductForm onSubmit={handleAddProduct} products={products} />
                </Box>
            </Modal>
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setAlertOpen(false)} severity="error" sx={{ width: "100%" }}>
                    El código del producto ya existe. Intente con otro.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;