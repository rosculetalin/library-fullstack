import React from 'react';
import { Carousel } from "./Carousel";
import { ExploreTopBooks } from "./ExploreTopBooks";
import { Presentation } from "./Presentation";
import { QAServices } from "./QAServices";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks/>
            <Carousel/>
            <Presentation/>
            <QAServices/>
        </>
    );
}