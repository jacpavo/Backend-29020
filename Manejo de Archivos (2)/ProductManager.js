import fs from 'fs'

const path = '/files/productos.json'

export default class ProductManager {
    consultarProducto = async ()=>{
        if(fs.existsSync ()){
            const data = await fs.promises.readFile(path, 'utf-8')
            console.log(data)
            const products = JSON.parse(data)
            return products
        } else {
            return []
        }
    };

    crearProductos = async (info)=>{
        const productos = await this.consultarProducto()
        if (productos.length== 0) {
            info.id = 1;
        } else {
            info.id = productos[productos.length - 1].id + 1;
        }
        productos.push(info)
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        return info
    }
}

const product = new ProductManager(); 

const env = async() =>{
    let primeraConsultaProductos = await product.consultarProducto();
    console.log (primeraConsultaProductos); 
    let producto = {
        Marca: "Renault",
        Modelo: "Duster 1.3 Turbo",
        Precio: 27000,
        Thumbnail: "https://1.bp.blogspot.com/-n1EOq5rlG90/YHRNfBLyIAI/AAAAAAAAAPA/NUz2sUajdeUOz69o5ZNRhmy70K_URx2HgCLcBGAsYHQ/s681/Renault%2BDuster%2B2021%2BEcuador%2Bfayalsautos.png",
        Stock: 20
    }
    let result = await product.crearProducto(product);
    console.log(result); 
    let segundaConsultaProductos = await product.consultarProducto();
    console.log(segundaConsultaProductos); 
}

env(); 