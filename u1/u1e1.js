// T5. Técnicas para mejorar la estructura y robustez de código
// U1. Gestión de errores y excepciones
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:
export class InventoryManager {
    #productList;

    constructor() {
        this.#productList = [];
    }

    init(products) {
        const issues = [];
        let correct = true;

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            try {
                this.addProduct(product);
            } catch (error) {
                issues.push(error.message);
                correct = false;
            }
        }

        if (correct) {
            return true;
        } else {
            return issues;
        }
    }

    nProducts() {
        return this.#productList.length;
    }

    validateProduct(product) {
        if (
            typeof product.code !== 'number' || product.code < 0 ||
            typeof product.discount !== 'number' || product.discount < 0 ||
            typeof product.amount !== 'number' || product.amount < 0 ||
            typeof product.name !== 'string' || product.name === '' ||
            typeof product.price !== 'number' || product.price < 0 
        ) {
            throw new Error(`ERROR_DATA. Alguno de los datos del producto (${product.code}) no tiene un formato válido.`);
        }

        if (this.#productList.find(p => p.code === product.code)) {
            throw new Error(`INVENTORY_CODE. Ya existe otro producto con ese código (${product.code}).`);
        }

        if (this.#productList.find(p => p.name === product.name)) {
            throw new Error(`INVENTORY_NAME. El nombre del producto (${product.code}) ya existe.`);
        }

        if (product.price < 50) {
            throw new Error(`INVENTORY_PRICE. El precio del producto (${product.code}) no puede ser inferior a 50.`);
        }

        if (product.discount < 0 || product.discount > 10) {
            throw new Error(`INVENTORY_DISCOUNT. El descuento del producto (${product.code}) debe estar entre 0 y 10.`);
        }

        if (product.amount < 0) {
            throw new Error(`INVENTORY_AMOUNT. La cantidad de producto (${product.code}) no puede ser negativa.`);
        }

        return true;
    }

    addProduct(product) {
        let result = { status: false, message: '' };

        try {
            this.validateProduct(product);
            this.#productList.push(product);

            result.status = true;
            result.message = `INVENTORY_ADD. El producto (${product.code}) ha sido añadido con éxito al inventario.`;
        } catch (error) {
            result.status = false;
            result.message = error.message;
        } finally {
            return result;
        }
    }
}