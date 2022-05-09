import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import SignInCreateAccountScreen from './screens/SignInCreateAccountScreen';
import DisplayAllPostsScreen from './screens/DisplayAllPostsScreen';
import DisplayPostDetailsScreen from './screens/DisplayPostDetailsScreen';
import AddPostScreen from './screens/AddPostScreen';
import LogOutScreen from './screens/LogOutScreen';
import { UserContextProvider } from './components/UserContext'

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignInCreateAccountScreen />} />
            <Route path="/create-account" element={<SignInCreateAccountScreen />} />
            <Route path="/display-posts" element={<DisplayAllPostsScreen />} />
            <Route path="/display-posts/:postId" element={<DisplayPostDetailsScreen />} />
            <Route path="/add-post" element={<AddPostScreen />} />
            <Route path="/log-out" element={<LogOutScreen />} />
            <Route path="*" element={<Navigate to="/display-posts" replace />}
            />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>

  );
}

export default App;