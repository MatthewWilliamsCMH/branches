# Branches

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
MIT License

## Description
Branches is a full-stack application that allows the users to record genealogical data and create a tree representing a family. This is a preliminary release of the app. (See [Future Development](#future-development) for necessary and possible improvements.) An image of the a sample tree can be seen below.

![image of a sample family tree in Branches](./assets/branches.jpg)

## Table of Contents
- [Installation](#installation)
- [License](#license)
- [Future Development](#future-development)
- [Acknowledgments](#acknowledgments)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To install the back end for Branches, download this repo being careful not to change the file and folder structure. Then run these commands

    npm install [installs dependences]
    npm run seed [seeds the mongodb database]
    npm run develop(or npm run build for a production-ready version) [starts the server]

In your browser, navigate to [https://branches-bv83.onrender.com/](https://branches-bv83.onrender.com/) to use Branches. You will be presented with a page from which you can log in or sign up as a new user. All fields are required. Once logged in, you will be taken to the sample Family Tree page. On this page, you can replace the root user information with your own info and build out your tree. To edit the data for a person, click on the box for that person, and an details form will open. Click on the pencil icon to edit data. When you've made your changes, click the Save and Close button. To remove a person, click the trashcan icon on the edit form.

If you have a large tree, it can be easy to get lost, so you will see in the lower left a miniature map of your entire tree and the section of the tree that you're looking at. You can also search for a person in the tree using the search box in the upper right.

A sample tree from Branches.

![image branches sample tree](./public/branches.jpg)


## Future Development
- The Balkan Family Tree JS library has some limitations—primarily cost and poor documentation—so we would like eventually to build our own interface.
- We would like to make the app more inclusive to allow users to build different kinds of families. Right now, for example, partners are limited to male-female relationships.
- We would like to continue to refactor the code so that as the application grows, we can be sure it delivers a snappy experience to users.
- In this demonstration release, every user that logs in is served the same tree; in a production release, usernames would be attached to trees so that different users using the same computer could see their own personal trees.

## Acknowledgments
Team members include: Matt Keeney, Brian Nyamohanga, Michael Nyamohanga, Brad Schneider, James Whatcott, and Matthew Williams. Thanks to our instructional staff for support during development.

## Contributing
To contribute to Branches, clone this repository locally and commit your code to a separate branch.

## Tests
If you are making core library changes, please write unit tests for your code and ensure that everything is working correctly before opening a pull request.

## Questions
Drop us a line at [matthewwilliamscmh@icloud.com](mailto:matthewwilliamscmh@icloud.com).
