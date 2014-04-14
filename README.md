Form Validation JavaScript
Features:
•	Real time form input validation
•	Multiple error messages per field displayed at once
•	Provides a standard for validation feedback communication
•	Lightweight: formValidation.js is only 6 KB (before any minimization / compression techniques); ~110 lines of actual code
•	Object Oriented
•	Supports unlimited number of forms on a single page
•	Allows for a clear separation of page specific logic from general form logic

-	Page logic includes:
	-	Error message key / value map
	-	Validation functions
	-	A mapping of input HTML elements to validation functions
-	General form logic (lives in formValidation.js):
	-	Form object
	-	Array of field objects
	-	User interface logic

Demo (Login Page):

•	Simple form with two inputs (user name and password)
•	[look at login page code] and note the following:
	-	Field based validation functions
	-	Form input  / validation function mapping
	-	Creation of a new form object (loginForm)
	-	Definition of error messages
	-	Population of loginForm’s field array
	-	Assignment of the form object’s validation routine to an event
•	With that our form is all ready to go


