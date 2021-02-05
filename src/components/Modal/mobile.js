import React from 'react';
import "./mobile.scss"

function Mobile({fullImageInfo,ApplyNewComment,setCommentData,commentData,setNameData,nameData,closeModal }) {
    return (
        <div className=" modal-mobile">
            <div className="modal__close" onClick={closeModal}>
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464" stroke="black"/>
                    <line x1="0.646447" y1="18.6464" x2="18.6464" y2="0.646446" stroke="black"/>
                </svg>

            </div>
                {fullImageInfo && (<img src={fullImageInfo.url} alt="Img" className="modal-mobile__image" />)}
                {!fullImageInfo && <img src="https://via.placeholder.com/150" alt="Img" className="modal-mobile__image"/>}

            <div className="modal-mobile__comments">
                {fullImageInfo && fullImageInfo.comments.map((comment) => (

                    <div key={comment.id} className="comment">
                        <p className="date">{comment.date_time}</p>
                        {comment.text}
                    </div>
                ))}
            </div>
            <input className="modal__input" type="text" placeholder="Ваше имя" value={nameData}
                   onChange={(e) => setNameData(e.target.value)}/>
            <input className="modal__input" type="text" placeholder="Ваш комментарий" value={commentData}
                   onChange={(e) => setCommentData(e.target.value)}/>
            < button className="modal__button" onClick={ApplyNewComment}>Оставить комментарий</button>

        </div>
    );
}

export default Mobile;