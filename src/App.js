import './App.css';
import allContacts from "./contacts.json"
import { useState } from "react";

/*
THIS HAS TO GO INSIDE THE FUNCTION...
const test = allContacts.map((actor) => {
  console.log("from outside of func")
  return {
    ...actor,
    id: nanoid(),
  };
});
console.log(test.map((actor)=> actor.id))
*/

function App() {
  //problem exists only in local dev mode (IA of Webpack - Code - Browser)
  // previously actorsWithID changed and celebs didn't...
  //turn id also into state variable (so it doesn't change with every re-load):
  //we don't need the setActorsWithId here...
  //now ids of celebs and actorsWithID match (both get hot-module-replaced - "replace code and keep state")
  //"cold-module-replace": hard-re-load loses the state
  // => we dont need to re-assign ids at all....

  const [celebs, setCelebs] = useState(allContacts.slice(0, 5));

  const addCeleb = () => {
    setCelebs((currentCelebs) => {
      const ids = currentCelebs.map((actor) => actor.id)
      const remainingActors = allContacts.filter((actor) => {
        return !ids.includes(actor.id);
      })
      const randomIndex = Math.floor(Math.random() * remainingActors.length);
      const dedupActors = new Set([remainingActors[randomIndex], ...currentCelebs]);
      return [...dedupActors];
    });
  };

  const sortPop = () => {
    setCelebs((currentCelebs) => {
      const copyCelebs = [...currentCelebs];
      const sortedCelebs = copyCelebs.sort((a, b) => {
        //ascending order
        // a - b for comparing numbers
        return a.popularity - b.popularity;
      })
      return sortedCelebs;
    })
  }

  const sortName  = () => {
    setCelebs((currentCelebs) => {
      const copyCelebs = [...currentCelebs];
      const sortedCelebs = copyCelebs.sort((a, b) => {
        //ascending order
        // sorting alphabetically with a > b
        return a.name > b.name;
      })
      return sortedCelebs;
    })
  }

  // we need to pass an argument to this function when we call it
  const deleteActor = (actorToDelete) => {
    setCelebs((currentCelebs) => {
      return currentCelebs.filter(
        (actor) => actor.id !== actorToDelete.id
      );
    });
  };


  return (
    <div className="App">
    <h1>IronContacts</h1>
    <button onClick={ addCeleb }> Add random celebrity </button>
    <button onClick={ sortPop }> Sort by Popularity </button>
    <button onClick={ sortName }> Sort by Name </button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {celebs.map((actor) => {
          return (
            <tr  key={actor.id}>
              <td><img src={actor.pictureUrl} height={100} alt={actor.name}/></td>
              <td><h3>{actor.name}</h3></td>
              <td><h3>{actor.popularity}</h3></td>
              <td><h3>{ actor.wonOscar ? "🏆" : "" }</h3></td>
              <td><h3>{ actor.wonEmmy ?  "⭐" : "" }</h3></td>
              <td><button onClick={ () => deleteActor(actor) }> Delete </button></td>  
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

export default App;
