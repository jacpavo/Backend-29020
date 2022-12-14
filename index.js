const fs = require('fs');

class Container {
    constructor(file){
        this.file = file
    }

    async save(product){
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)

        let newId
        newId = contObj.length > 0 ? contObj.length + 1 : 1;
        product.id = newId;

        contObj.push(product)
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    }

    async getAll(){
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)
        return contObj
    }

    async getById(id){
        let contObj = await this.getAll()
        let result = contObj.find(obj => obj.id == id)
        console.log(result)
        return(result)
    }

    async deleteById(id){
        let contObj = await this.getAll()
        let newObj = contObj.filter(obj => obj.id != id)
        await fs.promises.writeFile(this.file, JSON.stringify(newObj))
    }


    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }
}

let container = new Container('products.txt')

//container.save({ name: "Tomate", price: 10, id: 1 })
//container.save({ name: "Pera", price: 20, id: 2})
//container.save({ name: "Kiwi", price: 30, id: 3 })
//container.save({ name: "Carambola", price: 40, id: 4 })
//container.save({ name: "Mango", price: 50, id: 5 })


//console.log(container.getById(2))
//console.log(container.deleteById(4))
//console.log(container.deleteAll())