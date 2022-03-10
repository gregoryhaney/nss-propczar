# PropCzar
This application is my front-end capstone project, representing much of what I've learned over the first three months of a six-month long full-stack web developer course at Nashville Software School (NSS). This application uses HTML, CSS, JavaScript, and React. The data presented is served via json-server.

## Introduction
PropCzar is an application developed for three types of users: rental property owners, rental property managers, and tenants. It is primarily designed as a one-stop-shop for the owners and managers to have a quick picture of the properties. The tenants' capabilities, for this initial version, are limited to creating maintenance requests through the application.

## Purpose and Motivation for this Project
The idea for PropCzar came from seeing my mother struggle with keeping track of her rental properties. Even though she uses a property manager for all except one of her rental properties, her desk is covered in Post-it notes and scraps of paper that collectively tell the story about her rentals; however, it takes a lot of time and effort to decipher those types of 'records'. This application was developed to simplify her rental property woes.

## How this Application Works

### Wireframe Images


### ERD Image


## How this Application Was Developed
PropCzar was developed with a painstaking, methodical approach using a ton of up-front planning. I started with rough, hand-drawn sketches of what the UI would look like and what would happen when the user clicked certain buttons/links. From those sketches, I created wireframes in Sketchboard, which are included in this README. I then created an ERD which is also shown in this README. Next, I planned out the modules/components I would need and then created the application through React. Once the modules were built, I began pseudo-coding in each. I laid out what the purpose for each module/component would be, keeping in mind the single responsibility principle. Once that was completed, I wrote the algorithms to solve the problems at hand, and finished by writing the code.

In addition to writing the code, I used the Chrome developer/debugging tools extensively, and pushed to Github regularly

## Installing and Running this Application
PropCzar is a React application. After downloading the files to your local machine, including the associated json database file (database.json):
1. In the project directory, run: `npm start`
2. This starts the application and will open a browser tab to the application. Unless there is a port conflict, it will generally run on port 3000. [ http://localhost:3000 ]
3. You may elect to watch lint errors in the console by running: `npm test`
4. You will also need to clone down the database repo (https://github.com/gregoryhaney/nss-propczar-api ) and run the json server for the database. From the directory to which you've downloaded the `database.json` file, run: `json-server -p 8080 -w database.json`
  
  
## Difficulties and Challenges faced during this Process
This project presented me with a few hurdles once I got started. In my original vision of the application, it was very simple and straight-forward; it was to require only a couple of modules/components and I was planning to re-appropriate other code that I had written during my learning path for React. As I began peeling the onion, I found it to have a few more layers than I had anticipated. While I fortunately was still able to reuse previous code snippets for several pieces of PropCzar, I found myself writing functions and HTML/JSX from scratch.

I would say one of my biggest challenges was, despite my upfront planning, I did not write enough algorithmic problem-solving statements prior to jumping in and writing code. After a short time, however, I caught myself and made the necessary course-correction.

