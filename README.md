## Log In Details

- Username: admin
- Password: Pass1234

# Holidaze

![image](https://res.cloudinary.com/dmypm1x6b/image/upload/v1654120953/holidaze_zo7txe.jpg)

An accommodation booking website Where users can make enquiries for accommodations, contact the admin via a contact form
Search for accommodations and where an admin user can see enquires and contact requests and create new accommodations.

## Description

### Header

- logo and links
- Autodropdown search that gives links to accommodations upon search, displays a message if no search results.

### Home Page

- Hero image of showcasing Bryggen in bergen
- Intro text with an image from the cablecar going up to ulrikken
- Featured accommodations under "Our top picks" fetched with axios.

### Accomodations Page

- Search for accommodations by name and description.
- List of all accommodations.
- When there are no search results displays a message.

### Log in Page

- React hook form with yup validation
- Sends log-in info with Axios to the api, displays error if login is unsuccessful.
- If login is successfully made, stores user data in local storage and redirects the admin user to the admin page.

### Contact Page

- Contact form made with react hook form and yup validation.
- Contact form if successfully filled out will send the message to the api to be displayed on the admin panel.
- Displays success message if Axios request was filled out successfully and resets the form.

### Accomodation Page

- Uses the functions getStaticPaths and getStaticProps, with the params from getStatic Paths to get the id of the accommodation and to provide the accommodation that the user tries to access.

- Displays a single accommodation with an image of the accommodation and an image of the room and a description of the accommodation.

- Image section has two images with one one of them set as the main image, and two thumbnails, pressing the thumbnail of an image changes the main image to the thumbnail that was pressed.

- Users can send information to do an enquiry with a modal

- Modal with Accommodation information and a form created with react hookform and yup validation.

- Axios request gets made on submit if the request is successful the users get their information displayed and a message confirming that the enquiry is made.

### Admin Page

- Log out button that logs out the user by removing user info from local storage.
- Accommodation form with react hook form and yup validation for creating new accommodations.
- Displays error messages if the form is filled out incorrectly.
- If the form is correctly filled out it sends the information and JWT with axios post.
- If the post request is successful displays a success message and accommodation gets added to the api.
- List of enquiries made by users fetched with axios.
- List of messages made by users fetched with axios.

## Built With

- [Next js](https://nextjs.org/)
- [Scss](https://sass-lang.com/)
- [Strapi](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone https://github.com/Noroff-FEU-Assignments/project-exam-2-Mindless-dev.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following commands:

```bash
npm run dev
```

## Contact

[My LinkedIn page](https://www.linkedin.com/in/kenny-holmen-b853b4a1)

## Acknowledgments

```
hooks>UseLocalStorage

```

UseLocalStorage hook is not made by me and is taken from https://usehooks.com/useLocalStorage.
