import React, {useEffect, useState, useRef, useCallback} from 'react';
import axios from "axios";

import "./Modal.scss"

import Mobile from "./mobile";
import Desktop from "./desktop";

const getDateTimeUNIX = (unix_time) => {
    let date_time = new Date(unix_time);
    return date_time.getDate() + '.' + date_time.getMonth() + '.' + date_time.getFullYear();
}
const Modal = ({imageId, closeModal, isTabletOrMobileDevice}) => {
    const [fullImageInfo, setFullImageInfo] = useState();
    const [nameData, setNameData] = useState('');
    const [commentData, setCommentData] = useState('');
    const modalWindow = useRef();

    useEffect(() => {
        async function getApiFullImg(imgId) {
            return await axios.get('https://boiling-refuge-66454.herokuapp.com/images/' + imgId);
        }

        if (imageId) {
            getApiFullImg(imageId).then((res) => {
                res.data.comments.map((item) => {
                    item.date_time = getDateTimeUNIX(item.date);
                    return item;
                })
                setFullImageInfo(res.data)
            });
        }
    }, [imageId]);
    const handleModalClick = useCallback(event => {
        if (event.path.indexOf(modalWindow.current) === -1 && !isTabletOrMobileDevice) {
            closeModal();
        }
    }, [isTabletOrMobileDevice,closeModal ]);
    useEffect(() => {
        if (!isTabletOrMobileDevice) window.addEventListener('click', handleModalClick);
        return () => {
            window.removeEventListener("click", handleModalClick);
        }
    }, [isTabletOrMobileDevice, handleModalClick])



    const PostCommentOnServer = (obj) => {
        axios.post('https://boiling-refuge-66454.herokuapp.com/images/' + imageId + '/comments', obj).finally(() => {
            let copiedState = {};
            Object.assign(copiedState, fullImageInfo)
            copiedState.comments.push(obj);
            setFullImageInfo(copiedState);
        });

    }
    const ApplyNewComment = () => {
        let date = Date.now();
        PostCommentOnServer({
            date: Date.now(),
            text: (commentData ? commentData : "Пустой комментарий"),
            id: Math.random(),
            date_time: getDateTimeUNIX(date)
        });


    }
    return (
        <React.Fragment>
            {isTabletOrMobileDevice && (<Mobile fullImageInfo={fullImageInfo}
                                                ApplyNewComment={ApplyNewComment} setCommentData={setCommentData}
                                                commentData={commentData} setNameData={setNameData}
                                                nameData={nameData} closeModal={closeModal}/>)}
            {!isTabletOrMobileDevice && (<Desktop modalWindow={modalWindow} fullImageInfo={fullImageInfo}
                                                  ApplyNewComment={ApplyNewComment} setCommentData={setCommentData}
                                                  commentData={commentData} setNameData={setNameData}
                                                  nameData={nameData} closeModal={closeModal}/>)}
        </React.Fragment>
    );
};

export default Modal;
