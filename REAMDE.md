# challenge box

## setup

- This box is already setup to get some cities when loaded.
- APIs are running at "/api/addresses". This works for both GET and POST.
- GET is already wired. However, the Save Address button is not working

## challenge

Reminder: Use async/await for this

### one

- On click of Save Address button add city to server using a POST request.
- When the server returns 201 in response, i.e. the addition was successful you add that city to the list
- Clear the input box

### two

- show a loader, just a span saying "saving to server..." when the request is going on.
- hide the loader as soon as you receive response

### three

- catch errors if any

  - test it by changing the API address and see if it shows the error

- show a message to user saying, "Couldn't save the data"

- make sure that input box is not cleared in this case otherwise user has to type again.

## homework

Make this entire thing an address book management app.

- Implement Delete Feature
- Implement Edit Feature
