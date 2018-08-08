# Trash to Treasure

Trash to Treasure is a progressive web app that helps people find the treasures their neighbors are throwing away and prevents  furniture and household goods from ending up in the landfill. Users can snap and post photos of free items left out on the street for others to take. People looking for cool finds in their neighborhood can narrow their search without having to walk every block. 

I used the Google Maps Platform for its map and geocoding APIs and Firebase for the NoSQL database, a REST API and cloud storage for the photos. Libraries include Google Map React to interface between the map API and React, React Firebase File Uploader to enable easy photo uploads, and Butter Toast to inform users when geolocation is unavailable. 


## Built With

* [FireBase](https://firebase.google.com/) - Database and cloud storage
* [Google Maps Platform](https://cloud.google.com/maps-platform/) - map api, geocoding api
* [React](https://reactjs.org/) - JavaScript library for building user interfaces
* [Bootstrap](https://getbootstrap.com/) - front-end framework
* [google-map-react](https://www.npmjs.com/package/google-map-react) - library to interface with google map api
* [react-firebase-file-uploader](https://www.npmjs.com/package/react-firebase-file-uploader) - library to upload files to firebase 
* [Butter Toast](https://www.npmjs.com/package/butter-toast) - Toast notifications
* Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

## To Do
I plan to add the following features: 
* Redux to handle state and allow the map's zoom level and current centering to be returned to when the user navigates away from and then back to the map page. 
* User accounts 
* A list view of items sorted by distance from user's current location





