import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const Filters = ({ sortField, onSortChange }: { sortField: string; onSortChange: (value: string) => void }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Ordenar por</FormLabel>
            <RadioGroup value={sortField} onChange={(e) => onSortChange(e.target.value)}>
                <FormControlLabel value="code" control={<Radio />} label="Código" />
                <FormControlLabel value="name" control={<Radio />} label="Nombre" />
                <FormControlLabel value="quantity" control={<Radio />} label="Cantidad" />
                <FormControlLabel value="creation" control={<Radio />} label="Creación" />
            </RadioGroup>
            <Button variant="contained" size="small" onClick={() => onSortChange("")} sx={{ mt: 2 }}>
                Limpiar filtros
            </Button>
        </FormControl>
    );
};

export default Filters;