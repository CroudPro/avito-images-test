import React, {useEffect, useState, useRef, useCallback} from 'react';
import "./Modal.scss"
import axios from "axios";
import "./mobile"
import Mobile from "./mobile";
import Desktop from "./desktop";

const getDateTimeUNIX = (unix_time) => {
    let date_time = new Date(unix_time);
    let date_str = date_time.getDate() + '.' + date_time.getMonth() + '.' + date_time.getFullYear();
    return date_str;
}
const Modal = ({imageId, closeModal, isTabletOrMobileDevice}) => {
    const [fullImageInfo, setFullImageInfo] = useState();
    const [nameData, setNameData] = useState('');
    const [commentData, setCommentData] = useState('');
    const modalWindow = useRef();
    useEffect(() => {
        async function getApiFullImg(imgId) {
            let res = await axios.get('https://boiling-refuge-66454.herokuapp.com/images/' + imgId);

            console.log(res.data);
            return res;
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
    }, []);
    useEffect(() => {
        window.addEventListener('click', handleModalClick);
        return () => {
            window.removeEventListener("click", handleModalClick);
        }
    })
    const PostCommentOnServer = (obj) => {
        axios.post('https://boiling-refuge-66454.herokuapp.com/images/' + imageId + '/comments', obj).finally(() => {
            let date_time = new Date(obj.date);

            let copiedState = {};
            Object.assign(copiedState, fullImageInfo)
            copiedState.comments.push(obj);
            setFullImageInfo(copiedState);
        });

    }
    const ApplyNewComment = (e) => {
        let dName = "Аноним", dComment = "Пустой комментарий";
        if (nameData) dName = nameData;
        if (commentData) dComment = commentData;
        /*let copiedState = {};
        Object.assign(copiedState,fullImageInfo)
        copiedState.comments.push({ date: Date.now(), text: dComment,id: Math.random()});
        setFullImageInfo    (copiedState);*/
        let date = Date.now();
        PostCommentOnServer({date: Date.now(), text: dComment, id: Math.random(), date_time: getDateTimeUNIX(date)});


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
