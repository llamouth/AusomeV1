const express = require('express');
const resources = express.Router()
const { getAllResources, getSingleResource, createResource, deleteResource } = require('../queries/resources.queries')

resources.get('/', async (req, res) => {
    try {
        const allResources = await getAllResources()
        res.status(200).json(allResources)
    } catch (error) {
        return res.status(500).json({ 'error': error })
    }
})

resources.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const singleResource = await getSingleResource(id);
        res.status(200).json(singleResource)
    } catch (error) {
        return res.status(500).json({ 'error': error })
    }
})

resources.post('/', async (req, res) => {
    try {
        const newResource = await createResource(req.body)
        res.status(200).json(newResource)
    } catch (error) {
        return res.status(500).json({ 'error': error })
    }
})

resources.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await deleteResource(id)
        res.status(200).json({ 'success': 'Successfully Deleted Resource' })
    } catch (error) {
        return res.status(500).json({ 'error': error })
    }
})

module.exports = resources