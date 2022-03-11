import { useState, useEffect } from 'react';
import './styles.css';
import { db } from './firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { images } from './images';
import { async } from '@firebase/util';
function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const peopleCollectionRef = collection(db, 'people');
  useEffect(() => {
    const getPeople = async () => {
      const data = await getDocs(peopleCollectionRef);
      setPerson(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPeople();
  }, []);
  const createPerson = async () => {
    await addDoc(peopleCollectionRef, {
      name: newName,
      age: Number(newAge),
      description: newDescription,
    });
  };

  const updatePerson = async (id, age) => {
    const personDoc = doc(db, 'people', id);
    const newField = { age: age + 1 };
    await updateDoc(personDoc, newField);
  };
  const deleteUser = async (id) => {
    const personDoc = doc(db, 'people', id);
    await deleteDoc(personDoc);
  };
  return (
    <div className="App">
      <input
        placeholder="Name"
        onChange={(event) => setNewName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(event) => setNewAge(event.target.value)}
      />
      <input
        placeholder="description"
        onChange={(event) => setNewDescription(event.target.value)}
      />
      <button onClick={createPerson}>Create animal</button>
      <section>
        {person.map((user, index) => {
          return (
            <div className="object" key={user.id}>
              {' '}
              <img src={images[index]} />
              <h1>Name: {user.name}</h1>
              <h2>Age: {user.age}</h2>
              <p>
                <span>Description:</span> {user.description}
              </p>
              <button
                onClick={() => {
                  updatePerson(user.id, user.age);
                }}
              >
                Increase Age!
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete!
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
