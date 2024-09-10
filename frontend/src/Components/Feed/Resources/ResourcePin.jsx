import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResourcePin = ({ resource }) => {

    return (
        <div className="flex items-center space-x-4">
            <div className="bg-gray-300 rounded-full h-12 w-12"></div>
            <div>
                <p className="font-bold">{resource?.category}</p>
                <Button variant='link' as={Link} to={resource?.url} className="text-sm text-gray-500">{resource?.category}</Button>
            </div>
        </div>
    );
};

export default ResourcePin;