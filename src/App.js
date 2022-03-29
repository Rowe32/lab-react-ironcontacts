import './App.css';
import allContacts from "./contacts.json"
import { useState } from "react";
import { nanoid } from "nanoid"

function App() {
  const [celebs, setCelebs] = useState();
  const firstFive = allContacts.slice(0, 5);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {firstFive.map((elem, index) => {
            return (
            <tr key= { nanoid() }>
              <td><img src={elem.pictureUrl} height={100} alt={elem.name}/></td>
              <td><h3>{elem.name}</h3></td>
              <td><h3>{elem.popularity}</h3></td>
            </tr>
          )})}
        </tbody>
      </table> 
    </div>
  );
}

export default App;
