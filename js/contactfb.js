

// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
   apiKey: "AIzaSyDBQLStZD3Gb8OamU37ppTY-5tZ_R_Ep2w",
  authDomain: "contactus-7685d.firebaseapp.com",
  databaseURL: "https://contactus-7685d-default-rtdb.firebaseio.com",
  projectId: "contactus-7685d",
  storageBucket: "contactus-7685d.firebasestorage.app",
  messagingSenderId: "575810676508",
  appId: "1:575810676508:web:9de1ff679ef0902af73cd9",
  measurementId: "G-3XY4Y8XDBM"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}