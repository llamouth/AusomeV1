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

        // const getRandomResource = () => {
        //     if (resources.length > 0) {
        //         const newRandomResource = resources[Math.floor(Math.random() * resources.length)]; 
        //         return newRandomResource;
        //     }
        // }; 
        // Fetch resources when component mounts or id changes
        fetch(`${API}/resources`)
            .then(res => res.json())
            .then(res => {
                const getRandomResource = () => {
                    if (res.length > 0) {
                        const newRandomResource = res[Math.floor(Math.random() * res.length)];
                        const alreadyFoundResource = Object.values(resourcesDisplayed)
                        // console.log(newRandomResource)
                        // console.log(alreadyFoundResource)
                        // if(alreadyFoundResource){
                        //     return getRandomResource()
                        // } 
                        return newRandomResource;
                    }
                }; 
                setResources(res);
                Object.keys(resourcesDisplayed).map( key => {
                    const newResource = getRandomResource()
                    setResourcesDisplayed(prevState => { 
                        return { ...prevState, [key] : newResource }
                    })
                })

            })
            .catch(err => console.error(err));

            
    }, [ ]);

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
