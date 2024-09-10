const db = require('../db/dbConfig')

const getAllResources = async () => {
    try {
        const allResources = await db.any('SELECT * FROM resources')
        return allResources
    } catch (error) {
        return error
    }
}

const getSingleResource = async (id) => {
    try {
        const singleResource = await db.one('SELECT * FROM resources WHERE id=$1', id)
        return singleResource
    } catch (error) {
        return error
    }
}

const createResource = async (resource) => {
    try {
        const {url, category, user_id, description } = resource
        const newResource = await db.one('INSERT INTO resources (url, category, user_id, description) VALUES ($1, $2, $3, $4) RETURNING *', [url, category, user_id, description])
        return newResource
    } catch (error) {
        return error
    }
}

const deleteResource = async (id) => {
    try {
        const deletedResource = await db.one('DELETE FROM resources WHERE id=$1 RETURNING *', id)
        return deletedResource
    } catch (error) {
        return error
    }
}

module.exports = {getAllResources, getSingleResource, createResource, deleteResource }