import Database from '../../Database/access/src/crud.js'

const database = new Database();

class Repository {
    constructor(model){
        this.model = model;
    }

    create = async (data) => {
        return await database.create(this.model, { data })
    }

    read = async (
        select = {},
        filters = {}
    ) => {
        return await database.read(this.model)
    }
}

export default Repository;

const country = new Repository("country");

await country.read()