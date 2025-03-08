document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-element');
    let loadedVideos = 0;

    videos.forEach(video => {
        video.addEventListener('loadeddata', () => {
            loadedVideos += 1;
            if (loadedVideos === videos.length) {
                videos.forEach(v => v.play());
            }
        });
    });

    setVideoMinHeight();
    updateVideoPosition();
});

window.addEventListener('resize', () => {
    setVideoMinHeight();
    updateVideoPosition();
});

function updateVideoPosition() {
    const spacers = document.querySelectorAll('.spacer');
    spacers.forEach(spacer => {
        // Вычисление смещения spacer от text-block
        const spacerRect = spacer.getBoundingClientRect();
        const textBlockRect = spacer.closest('.text-block').getBoundingClientRect();
        const offsetLeft = spacerRect.left - textBlockRect.left;
        const offsetTop = textBlockRect.top - spacerRect.top;

        const video = spacer.querySelector('video');
        video.style.top = `${offsetTop}px`;
        video.style.left = `-${offsetLeft}px`;
    });
}

function setVideoMinHeight() {
    const textBlock = document.querySelector('.text-block');
    const textBlockWidth = textBlock.getBoundingClientRect().width;
    const videos = document.querySelectorAll('.spacer video');
    videos.forEach(video => {
        video.style.minWidth = `${textBlockWidth}px`;
    });
}