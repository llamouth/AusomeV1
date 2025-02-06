import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResourcePin from './ResourcePin';

const ResourcesContainer = () => {
    
    const { id } = useParams(); // Added parentheses to useParams
    const API = import.meta.env.VITE_BASE_URL;
    const [resources, setResources] = useState([]);
    const [resourcesDisplayed, setResourcesDisplayed] = useState({
        first: "",
        second: "",
        third: "",
    });


    
    useEffect(() => {
        fetch(`${API}/resources`)
            .then(res => res.json())
            .then(res => {
                setResources(res);
                const noDuplicateResources = [...res];
                const newResourcesDisplayed = {};
                const getRandomResource = () => {
                    if (noDuplicateResources.length > 0) {
                        const randomIndex = Math.floor(Math.random() * noDuplicateResources.length);
                        const newRandomResource = noDuplicateResources[randomIndex];
                        noDuplicateResources.splice(randomIndex, 1);
                        return newRandomResource;
                    }
                    return null;
                };

                for (const key of Object.keys(resourcesDisplayed)) {
                    const newResource = getRandomResource();
                    if (newResource) {
                        newResourcesDisplayed[key] = newResource;
                    }
                }

                setResourcesDisplayed(newResourcesDisplayed);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        
    }, [resourcesDisplayed])


    return (
        <div>
            <h5 className="text-center text-xl font-bold mb-4">Resources</h5>
            <div className="flex flex-col space-y-4">
                <ResourcePin resource={resourcesDisplayed.first} />
                <ResourcePin resource={resourcesDisplayed.second} />
                <ResourcePin resource={resourcesDisplayed.third} />
            </div>
        </div>
    );
};

export default ResourcesContainer;
