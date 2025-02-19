function toggleMusic() {
    const audio = document.getElementById('bg-music');
    if (audio.muted) {
        audio.muted = false;
        audio.volume = 0.1; // 볼륨 50%
        audio.play(); // 강제 재생
    } else {
        audio.muted = true;
        audio.pause();
    }
}