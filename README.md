# Week 9 Assignment - I hate your opinion social media app

- Its basically the reverse of other social media apps, where you can only dislike posts and its all about hating each other
- So basically it'll have the same content as any other social media app but its not hiding what it is

- Wireframe and database will be in the screenshots tab
- https://week09-assignment-jbmm.vercel.app/

## What worked well

- Can sign up with clerk and then can create a username and bio with my site
- if you go to a users page that doesnt exist, it will tell you the user does not exist
- used a library component, the dropdown menu
- posts are associated with clerk id
- you can click a users username on a post to go see their profile
- only users can delete or edit content
- sends an error message when a user does not enter a unique username - prompts them to try again - this allowed me to use their username in the urls instead of userids
- It was made using typescript

## Even better if

- A lot of this came down to running out of time, like not making the edit button functional, I know how but I was running out of time as I had a busy weekend
- I didnt manage to get comments added either like I had planned, I know how I would go about doing this though, basically the same as how I put comments on my blog last week, this time they are just attached to small post components rather than a whole page but the theory is still the same.
- I didnt manage to do the disliking posts or follower and followee like i had planned either, but this is something I was particualy sure how to approach, I dont really know how junction tables work but im looking forward to seeing them next week
- I put styling on the back burner this time around, dealing with types in typescript caused enough issues and took up a lot of my time

## Resources

- https://www.w3schools.com/sql/sql_unique.asp - learned about the unique constraint so i get unique usernames
- https://clerk.com/docs/components/user/user-profile
- https://clerk.com/docs/references/backend/overview#get-the-user-id-and-other-properties - learning about clerk and to get certain info from profiles
- https://clerk.com/docs/references/nextjs/current-user
- https://clerk.com/docs/reference/backend-api/tag/Users#operation/GetUser
- https://nextjs.org/docs/app/guides/upgrading/version-15#params--searchparams - learning about search params especailly for typescript
- https://nextjs.org/docs/app/getting-started/error-handling - same with error handling but i found this more complicated with typesript types
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#examples - getting the date timestamp
- https://nextjs.org/docs/app/api-reference/file-conventions/page - more search params for typescript
- https://www.w3schools.com/sql/func_sqlserver_lower.asp - Originally needed this for username urls but then i did it a different way so didnt need it anymore
- https://www.youtube.com/watch?v=AocT--scISg - how to style clerk components
- https://legacy.reactjs.org/docs/conditional-rendering.html - rendering the items that only the user should see
- https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm passing props and prop types in react
- https://www.radix-ui.com/primitives/docs/components/dropdown-menu - drop down menu radix
