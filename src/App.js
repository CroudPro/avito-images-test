import './App.scss';
import Modal from './components/Modal'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import classNames from 'classnames'
import {useMediaQuery} from 'react-responsive'

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
            const res = await axios.get('https://boiling-refuge-66454.herokuapp.com/images');
            setImagesList(res.data)
            console.log(res.data);
            return res;
        }

        getApiImg();

    }, []);

    const closeModal = () => {
        setShowImage(0);
    }
    return (
        <div className="images">

            <h2 className="images__title">Test App</h2>
            <div
                className={classNames("images__list", {"images__list--desktop": isDesktopOrLaptop}, {"images__list--mobile": isTabletOrMobileDevice})}>

                {!isTabletOrMobileDevice && imagesList && imagesList.map((image) => (
                    <img key={image.id} src={image.url} alt="Img" className="image--desktop"
                         onClick={() => setShowImage(image.id)}/>
                ))}
                {isTabletOrMobileDevice && imagesList && imagesList.map((image) => (
                    <img key={image.id} src={image.url} alt="Img" className="image--mobile"
                         onClick={() => setShowImage(image.id)}/>
                ))}
            </div>
            <div className="images__spacer"></div>
            <div className="images__footer">© 2018-2019</div>

            {showImage ? <Modal imageId={showImage} closeModal={closeModal} isTabletOrMobileDevice={isTabletOrMobileDevice}/> : ""}

        </div>
    );
}

export default App;
