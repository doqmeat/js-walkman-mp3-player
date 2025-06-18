/*
using this for the music player: https://github.com/sayantanm19/js-music-player
*/

// song info
let track_name = document.querySelector("#song");
let track_artist = document.querySelector("#artist");
let album_title = document.querySelector("#album-title");
let album_cover = document.querySelector("#album");
let genre = document.querySelector("#genre");
let year = document.querySelector("#year");

// currently playing screen
let track_progress = document.querySelector(".track-progress"); // blue progress slider
let curr_time = document.querySelector("#current-time"); // 00:00
let playing_status = document.querySelector("#playing-status"); //  or 󰐊
let now_playing = document.querySelector("#now-playing"); // 1/? tracks

// playlist screen
let current_song_playing = document.querySelector("#current-song-playing"); // current song name scrolling
let current_song_div = document.querySelector("#current"); // targets the div of current song playing

// screens
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
		album: "11100011", // name of album
		genre: "Shoegaze",
		year: "2025", // year song was released
		image: "files/11100011.jpeg", // album cover path
		path: "https://files.catbox.moe/jfmagx.mp3", // mp3 audio path
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

// use : creates the song listings for playlist screen
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

// loads playlist menu once
playlistMenu();

function loadTrack(index) {
	track_index = index; // stores current index

	clearInterval(updateTimer);
	resetValues(); // resets song progress
	curr_track.src = track_list[index].path;
	curr_track.load();

	album_cover.src = track_list[index].image;
	track_name.textContent = track_list[index].name;
	track_artist.textContent = track_list[index].artist;
	album_title.textContent = track_list[index].album;
	genre.textContent = track_list[index].genre;
	year.textContent = track_list[index].year;

	now_playing.textContent = index + 1 + "/" + track_list.length;

	// update current song name on bottom bar in playlist screen
	current_song_playing.innerHTML =
		"<marquee direction='left' scrollamount='3' behavior='scroll'>" +
		track_list[index].name +
		"</marquee>";

	updateTimer = setInterval(seekUpdate, 1000);

	// jumps to next track once it ends
	curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
	curr_time.textContent = "00:00";
	track_progress.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

// use : shows the playlist screen
function showPlaylist() {
	top_bar.textContent = "Playlist";
	currently_screen.style.display = "none"; // hides currently playing
	playlist_screen.style.display = "block"; // shows playlist
	// shows current song playing if there is one playing
	if (!isPlaying) current_song_div.style.display = "none";
	else current_song_div.style.display = "inline";
	curr_time.style.display = "none"; // hides bottom bar timer
}

// input : selected song index
// use : plays selected song and shows currently playing screen
function playlistSelection(index) {
	loadTrack(index);
	playTrack();
	current_song_div.style.display = "inline"; // current song playing shows
}

// use: shows the current playing song screen
function showCurrentSong() {
	top_bar.textContent = "Music";
	currently_screen.style.display = "block";
	playlist_screen.style.display = "none";
	current_song_div.style.display = "none";
	curr_time.style.display = "inline-block";
}

// play-pause button fuction on click
function playpauseTrack() {
	if (!isPlaying) playTrack();
	else pauseTrack();
}

// use : when track is playing
function playTrack() {
	curr_track.play();
	isPlaying = true;
	playing_status.textContent = "󰐊";
	playing_status.style.color = "rgb(35, 236, 35)";
	// shows current song playing if the playlist screen is showing
	if (playlist_screen.style.display == "block")
		current_song_div.style.display = "inline";
}

// use : when track is paused
function pauseTrack() {
	curr_track.pause();
	isPlaying = false;
	playing_status.textContent = "";
	playing_status.style.color = "rgb(217, 217, 217)";
	current_song_div.style.display = "none"; // always hides current song playing
}

// use : skips to next track
function nextTrack() {
	if (track_index < track_list.length - 1) track_index++;
	else track_index = 0;
	loadTrack(track_index);
	playTrack();
}

// use : skips to prev track
function prevTrack() {
	// check if its the first track in playlist
	if (track_index > 0) track_index--;
	// if not, it updates to the index of the last track
	else track_index = track_list.length - 1;
	loadTrack(track_index);
	playTrack();
}

// use : song progress slider function
function seekTo() {
	let seekto = curr_track.duration * (track_progress.value / 100);
	curr_track.currentTime = seekto;
}

// use : updates current timer
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

// use : searched the current song playing on youtube
function youtubeSearch() {
	let searchString =
		"https://www.youtube.com/results?search_query=" +
		track_list[track_index].name +
		"+" +
		track_list[track_index].artist;
	window.open(searchString, "_blank");
}
