// track that is currently playing
let now_playing = document.querySelector("#now-playing");
// targets src attribute
let track_art = document.querySelector("#album");

let track_name = document.querySelector("#song");
let track_artist = document.querySelector("#artist");
let album_title = document.querySelector("#album-title");
let genre = document.querySelector("#genre");
let year = document.querySelector("#year");

let playpause_btn = document.querySelector("#play-pause-btn");
let next_btn = document.querySelector(".right");
let prev_btn = document.querySelector(".left");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector("#current-time");
let playing_status = document.querySelector("#playing-status");

playing_status.textContent = "";

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
	{
		name: "Cyber Space 2-1: Slice & Sway",
		artist: "SEGA SOUND TEAM",
		album: "Sonic Frontiers Original Soundtrack Stillness & Motion",
		genre: "Drum n Bass",
		year: "2022",
		image: "files/sonic-frontiers-ost.jpg",
		path: "https://files.catbox.moe/rgotfj.mp3",
	},
	{
		name: "溢れてる",
		artist: "kinoue64",
		album: "あなただけに聴いてほしい",
		genre: "Rock",
		year: "2023",
		image: "files/kinoue64-album1.jpg",
		path: "https://files.catbox.moe/6gbrjt.mp3",
	},
];

function loadTrack(track_index) {
	clearInterval(updateTimer);
	resetValues();
	curr_track.src = track_list[track_index].path;
	curr_track.load();

	track_art.src = track_list[track_index].image;
	track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;
	album_title.textContent = track_list[track_index].album;
	genre.textContent = track_list[track_index].genre;
	year.textContent = track_list[track_index].year;

	now_playing.textContent = track_index + 1 + "/" + track_list.length;

	updateTimer = setInterval(seekUpdate, 1000);
	curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
	curr_time.textContent = "00:00";
	seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

// play-pause button fuction on click
function playpauseTrack() {
	if (!isPlaying) playTrack();
	else pauseTrack();
}

// when playing a track
function playTrack() {
	curr_track.play();
	isPlaying = true;
	playing_status.textContent = "󰐊";
	playing_status.style.color = "rgb(35, 236, 35)";
}

// when track is paused
function pauseTrack() {
	curr_track.pause();
	isPlaying = false;
	playing_status.textContent = "";
	playing_status.style.color = "rgb(217, 217, 217)";
}

function nextTrack() {
	if (track_index < track_list.length - 1) track_index += 1;
	else track_index = 0;
	loadTrack(track_index);
	playTrack();
}

function prevTrack() {
	if (track_index > 0) track_index -= 1;
	else track_index = track_list.length;
	loadTrack(track_index);
	playTrack();
}

function seekTo() {
	let seekto = curr_track.duration * (seek_slider.value / 100);
	curr_track.currentTime = seekto;
}

function setVolume() {
	curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
	let seekPosition = 0;

	if (!isNaN(curr_track.duration)) {
		seekPosition = curr_track.currentTime * (100 / curr_track.duration);

		seek_slider.value = seekPosition;

		let currentMinutes = Math.floor(curr_track.currentTime / 60);
		let currentSeconds = Math.floor(
			curr_track.currentTime - currentMinutes * 60
		);
		let durationMinutes = Math.floor(curr_track.duration / 60);
		let durationSeconds = Math.floor(
			curr_track.duration - durationMinutes * 60
		);

		if (currentSeconds < 10) {
			currentSeconds = "0" + currentSeconds;
		}
		if (durationSeconds < 10) {
			durationSeconds = "0" + durationSeconds;
		}
		if (currentMinutes < 10) {
			currentMinutes = "0" + currentMinutes;
		}
		if (durationMinutes < 10) {
			durationMinutes = "0" + durationMinutes;
		}

		curr_time.textContent = currentMinutes + ":" + currentSeconds;
	}
}
