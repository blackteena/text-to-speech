import React from 'react';
import '../styles/Video.scss'; // Импортируем SCSS стили 
import video from '../assets/video.mp4'; // Импортируем видео

const Video = () => {
    return (
        <div className="container">
            <div className="video-container__inner"> 
                <video className="video-container__video" controls> 
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default Video; // Экспортируем компонент по дефолту
 