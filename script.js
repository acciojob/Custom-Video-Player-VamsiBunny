/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub Video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip Forward / Backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume & Playback Rate
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Error Handling
video.addEventListener('error', () => {
  alert('Failed to load video. Please make sure download.mp4 exists.');
});

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);

// Progress Bar Scrubbing
let mousedown = false;

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => {
  if (mousedown) {
    scrub(e);
  }
});

progress.addEventListener('mousedown', () => {
  mousedown = true;
});

progress.addEventListener('mouseup', () => {
  mousedown = false;
});