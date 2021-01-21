import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { useState, useEffect } from 'react';
import './App.scss'

function App() {
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])

  useEffect(() => {
    loadDataOnce();
  }, [])

  const loadDataOnce = () => {
    getArtists();
    getAlbums();
    getSongs();
  }

  const getArtists = () => {
    fetch('http://127.0.0.1:8000/music/artists-list/')
      .then(response => response.json())
      .then(data =>
        setArtists(data))
  }

  const getAlbums = () => {
    fetch(`http://127.0.0.1:8000/music/albums-list/`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data)
      })
  }

  const getSongs = () => {
    fetch(`http://127.0.0.1:8000/music/songs-list/`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSongs(data)
      })
  }

  return (
    <div className="App">
      <div className="music-container">
        <div className="music-container-title">
          <h1>Welcome to Yaman's music App</h1>
        </div>
        <div className="music-container-content">
          {
            artists && artists.map((artist, index) => {
              return (
                <div key={index} className="artists">
                  <Accordion className="artists-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                    >
                      <Typography >{`The artist ${artist.artist_name}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="artists-details">
                      {
                        albums && albums.map((album, index) => {
                          if (album.artist === artist.id) {
                            return (
                              <div key={index} className="albums">
                                <Accordion className="albums-accordion">
                                  <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography>{album.album_title}</Typography>
                                  </AccordionSummary>
                                  {
                                    songs && songs.map((song, index) => {
                                      if (song.album === album.id) {
                                        return (
                                          <div key={index} className="songs">
                                            <AccordionDetails className="songs-details">
                                              {song.song_title}
                                            </AccordionDetails>
                                          </div>
                                        )
                                      }
                                    })
                                  }
                                </Accordion>
                              </div>
                            )
                          }
                        })
                      }
                    </AccordionDetails>
                  </Accordion>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
