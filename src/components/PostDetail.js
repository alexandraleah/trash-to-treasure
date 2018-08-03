import React, { Component } from 'react';
import firebase from '../fire';
import FileUploader from 'react-firebase-file-uploader';
const database = firebase.database();
export default function PostDetail() {
  return (
    <form>
      {/* for mvp I think I will just have people post the image without any comments or description and then show it on the map with the time posted. will add these other fields if I have time. */}
      {/* <label htmlFor="tags">tags</label>
            <input
              type="text"
              name="tags"
              placeholder="example: chair, furniture"
            />
            <label htmlFor="description">description</label>
            <textarea name="description" /> */}

      <label htmlFor="photo">Take a photo</label>
    </form>
  );
}
//if have a page for users to fill out additional info about the item flesh this out here.
