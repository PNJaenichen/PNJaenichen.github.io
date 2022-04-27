import React from "react";
import { useSelector } from "react-redux";
import { Route, Link, Redirect } from "react-router-dom";
import { selectCurrentUser, selectIsLoggedIn } from "../features/session//sessionSlice";
import EditProfileForm from "./EditProfileForm";

export default function Profile () {
  const currentUser = useSelector(selectCurrentUser)
  const loggedIn = useSelector(selectIsLoggedIn);

  // call useRouteMatch() to get the url and path
  
  // use loggedIn to return a Redirect
  
  if (!loggedIn) {
    <Redirect to='/signUp' />
  }
  return (
    <main>
      <h1>{currentUser.username}</h1>
      <Link to={"/profile/edit"}>Edit</Link>
      <Route path='profile/edit'>
        <EditProfileForm />
      </Route>
    </main>
  )
}
