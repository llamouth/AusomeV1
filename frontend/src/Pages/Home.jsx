import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeImage from '../assets/Temp-Ausome.png';
import ScrambleText from '../components/Home/ScrambleText';
import { AllContext } from '../Context/AllContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
    const user_id = window.localStorage.getItem('user_id');
    const { fetchUserProfile } = useContext(AllContext);
    const token = window.localStorage.getItem('token');

    
    useEffect(() => {
        fetchUserProfile(user_id)
    }, [])

    return (
        <div className="flex items-center justify-center space-y-4 h-[90vh]">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h1 className="text-3xl font-bold">Welcome to Ausome!</h1>
                <p className="text-lg">
                    Ausome is a platform for people on the spectrum to connect with each other and share their experiences.
                </p>
            </div>

            {/* Content Section */}
            <Card className="flex flex-col items-center justify-center space-y-4 p-6">
                <CardContent className="flex flex-col items-center space-y-4">
                    <img src={HomeImage} alt="Home" className="h-[400px] w-[600px] rounded-lg" />
                    <ScrambleText />
                    {token ? (
                        <Button asChild>
                            <Link to={`/${user_id}/feed`}>Feed</Link>
                        </Button>
                    ) : (
                        <div className="flex space-x-4">
                            <Button asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/signup">Sign-Up</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
