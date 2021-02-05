import React, {useEffect, useState} from 'react'
import axios from 'axios';
import classNames from 'classnames'
import {useMediaQuery} from 'react-responsive'

import Modal from './components/Modal'

import './App.scss';

function App() {
    const [imagesList, setImagesList] = useState();
    const [showImage, setShowImage] = useState(0);
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
    useEffect(() => {
        async function getApiImg() {
            return await axios.get('https://boiling-refuge-66454.herokuapp.com/images');
        }

        getApiImg().then((data) => {
            setImagesList(data.data)
        });

    }, []);
    return (
        <div className="images">

            <h2 className="images__title">Test App</h2>
            <div
                className={classNames("images__list", {"images__list--desktop": isDesktopOrLaptop}, {"images__list--mobile": isTabletOrMobileDevice})}>
                {imagesList && imagesList.map((image) => (<img key={image.id} src={image.url} alt="Img"
                                                               className={classNames({"image--desktop": isDesktopOrLaptop}, {"image--mobile": isTabletOrMobileDevice})}
                                                               onClick={() => setShowImage(image.id)}/>))}
            </div>
            <div className="images__spacer"/>
            <div className="images__footer">© 2018-2019</div>
            {showImage ? <Modal imageId={showImage} closeModal={() => setShowImage(0)}
                                isTabletOrMobileDevice={isTabletOrMobileDevice}/> : ""}
        </div>
    );
}

export default App;
