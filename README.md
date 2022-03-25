# PropCzar
This application is my front-end capstone project, representing much of what I've learned over the first three months of a six-month long full-stack web developer course at Nashville Software School (NSS). This application uses HTML, CSS, JavaScript, and React. The data presented is served via json-server.

## Introduction
PropCzar is an application developed for three types of users: rental property owners, rental property managers, and tenants. It is primarily designed as a one-stop-shop for the owners and managers to have a quick picture of the properties. The tenants' capabilities, for this initial version, are limited to creating maintenance requests through the application.

## Purpose and Motivation for this Project
The idea for PropCzar came from seeing my mother struggle with keeping track of her rental properties. Even though she uses a property manager for all except one of her rental properties, her desk is covered in Post-it notes and scraps of paper that collectively tell the story about her rentals; however, it takes a lot of time and effort to decipher those types of 'records'. This application was developed to simplify her rental property woes.

## How this Application Works

### Video Demonstration / Walk-Thorough

https://drive.google.com/file/d/1ZBsccN6ksuDFVZyUTkL0uE5PHH_dg1Vd/view?usp=sharing

### Screen Shot Images

1. Homepage for the role of 'owner', which has all capabilities (full NavBar). 'Manager' role has slightly fewer options that 'owner'. 'Tenant' has very limited capabilities and NavBar options available.

![Screen Shot 2022-03-17 at 2 29 33 PM (2)](https://user-images.githubusercontent.com/10354411/158883296-7227c4cc-1156-444c-96c0-e6dff73ce85e.png)


2. From within "Property Management" on the NavBar, this screen is for making updates to an existing property, such as rent changes or changes in tenancy.

![Screen Shot 2022-03-17 at 2 39 54 PM (2)](https://user-images.githubusercontent.com/10354411/158883333-d1450a8f-5d82-467a-8e30-992807dd9259.png)

3. This is the list of Maintenance Requests opened by the tenants for their property. The owner can see all requests; the manager can see only those for properties to which he/she is assigned. The tenant can view only requests that he/she submitted.

![Screen Shot 2022-03-17 at 2 40 10 PM (2)](https://user-images.githubusercontent.com/10354411/158883347-b3cf5db3-bea0-400a-b6cc-ef809a9168fd.png)

4. This is an edit screen for a Maintenance Request. The owner and manager can edit all parts of the request. A tenant is restricted to edit only requests that he/she submitted, only permitted to edit the title and description, and can only edit if the status is Open.

![Screen Shot 2022-03-17 at 2 40 25 PM (2)](https://user-images.githubusercontent.com/10354411/158883374-a6ef95c4-b826-4ea9-9b5e-98ec364e2d19.png)

5.  This screen shot is a list of all Manager Notes.  The owner can view/edit/delete all Manager Notes while the manager can view/edit/delete only Notes that he/she entered. Tenants are not allowed to see the Notes. The Manager Notes are displayed on the Home Page using these same restrictions.

![Screen Shot 2022-03-17 at 2 40 42 PM (2)](https://user-images.githubusercontent.com/10354411/158883390-c395055e-e2e8-4bf4-9d6a-842c356a82a6.png)

6.  The final screen shot is where we create a new Manager Note, showing use of dropdowns to select the manager making the note and the property selection. This screen shot was taken while logged in as the owner, which is why we see the managers listed. When logged in as a Manager, you would only see yourself, preventing a manager from creating a Note using another's name.

![Screen Shot 2022-03-17 at 2 41 06 PM (2)](https://user-images.githubusercontent.com/10354411/158883403-a59adb81-ff8c-47d5-939d-b15191059f0a.png)


### ERD Image
![PropCzar_ERD](https://user-images.githubusercontent.com/10354411/157886161-7e0fb8fc-1426-420a-96db-4a47d5a4f911.jpeg)


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

Another huge challenge is CSS. I originally had a grand vision of using flippable cards on the homepage and some other visually appealing sorcery; however, CSS and FlexBox are not my friends, nor are Bootstrap or ReactStrap. I felt lucky to end up with what I have and that it looks half-way decent. I feel I tried every combination of CSS, FlexBox, and the 'Strap brothers, but ended up with garbage. When I'd get one thing working, like a cool-looking NavBar, I'd go look at other things in the App, and find they were all kinds of jacked-up, like my buttons being pushed on top of each other, or checkboxes that no longer worked. 

