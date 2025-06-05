// tracks songs in playlist playing
let now_playing = document.querySelector("#now-playing");

// song info
let track_art = document.querySelector("#album");
let track_name = document.querySelector("#song");
let track_artist = document.querySelector("#artist");
let album_title = document.querySelector("#album-title");
let genre = document.querySelector("#genre");
let year = document.querySelector("#year");

let track_progress = document.querySelector(".track-progress");
let curr_time = document.querySelector("#current-time");
let playing_status = document.querySelector("#playing-status");
let current_song_playing = document.querySelector("#current-song-playing");
let current_song_div = document.querySelector("#current");

let top_bar = document.querySelector("#current-screen");
let currently_screen = document.querySelector("#current-song");
let playlist_screen = document.querySelector("#playlist");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// add your playlist here!
let track_list = [
	{
		name: "Camel8strike",
		artist: "Asian Glow",
		album: "11100011",
		genre: "Shoegaze",
		year: "2025",
		image: "files/11100011.jpeg",
		path: "https://files.catbox.moe/jfmagx.mp3",
	},
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

// playlist screen stays hidden on load
playlist_screen.style.display = "none";
current_song_div.style.display = "none";

function playlistMenu() {
	for (i = 0; i < track_list.length; i++) {
		playlist_screen.innerHTML +=
			"<button onclick='playlistSelection(" +
			i +
			")'><img src='" +
			track_list[i].image +
			"' alt='album cover for" +
			track_list[i].name +
			"'><span>" +
			track_list[i].name +
			"</span></button>";
	}
}

// loads playlist menu
playlistMenu();

function showPlaylist() {
	top_bar.textContent = "Playlist";
	currently_screen.style.display = "none";
	playlist_screen.style.display = "block";
	if (!isPlaying) current_song_div.style.display = "none";
	else current_song_div.style.display = "inline";
	curr_time.style.display = "none";
}

// playlist song selection
function playlistSelection(song_index) {
	loadTrack(song_index);
	playTrack();
	showCurrentSong(); // shows currently playing screen
}

function showCurrentSong() {
	top_bar.textContent = "Music";
	currently_screen.style.display = "block";
	playlist_screen.style.display = "none";
	current_song_div.style.display = "none";
	curr_time.style.display = "inline-block";
}

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

	// update current song name on bottom bar in playlist screen
	current_song_playing.innerHTML =
		"<marquee scrollamount='3'>" + track_list[track_index].name + "</marquee>";

	updateTimer = setInterval(seekUpdate, 1000);
	curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
	curr_time.textContent = "00:00";
	track_progress.value = 0;
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
	showCurrentSong();
}

// when track is paused
function pauseTrack() {
	curr_track.pause();
	isPlaying = false;
	playing_status.textContent = "";
	playing_status.style.color = "rgb(217, 217, 217)";
}

function nextTrack() {
	if (track_index < track_list.length - 1) track_index++;
	else track_index = 0;
	loadTrack(track_index);
	playTrack();
}

function prevTrack() {
	// check if its the first track in playlist
	if (track_index > 0) track_index--;
	// if not, it updates to the index of the last track
	else track_index = track_list.length - 1;
	loadTrack(track_index);
	playTrack();
}

function seekTo() {
	let seekto = curr_track.duration * (track_progress.value / 100);
	curr_track.currentTime = seekto;
}

function seekUpdate() {
	let seekPosition = 0;

	if (!isNaN(curr_track.duration)) {
		seekPosition = curr_track.currentTime * (100 / curr_track.duration);

		track_progress.value = seekPosition;

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
