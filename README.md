# -Saraha-App-Using-mongoDB-and-exrpess-
(Saraha App): Using mongoDB and exrpess   <br>
***Create two modules : <br>
User module:<br>
- name<br>
- Email <br>
- Password 
- phone  
- role 
- profile picture  
-cover pictures (array of pictures)  
message module: 
- content  
- send to => ref to user module 
- send by => ref to user module(optional) 
 
 **User module APIs :  
 - signUp( hash password before save it in the database and encrypt phone ) (apply joi validation)   
 - signIn (apply joi validation)   
 - updateUser ( account owner only can fo this api by using token concept) (apply joi validation)   
 - deleteUser ( admin only )  - get all users ( admin only )  
 - get user by id (apply joi validation)  
 - soft delete (by the owner of the account)  
 - get deleted users ( admin only ) 
 - add profile picture (single picture)(delete the existing one then add the new picture) 
 - add cover pictures (array of pictures)  
 **message module APIs :   
- send message ( don’t send send by manually in body or params you must take it from the token) (apply joi validation)  
- delete message( by sender only using token concept)  
- Get all messages sent to this user ( with the information of the sender and receiver )  
- Get all messages sent by this user ( with the information of the sender and receiver )(admin only)  
-Get messages  sent today or yesterday
