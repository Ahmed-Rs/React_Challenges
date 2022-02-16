import React, { useMemo } from "react";
import "./App.css";

function wait(duration) {
  const t = Date.now();
  while (true) {
    if (Date.now() - t > duration) {
      return true;
    }
  }
}

// const Button = React.memo(function ({ onClick }) {
//   // .memo() similaire à React.useMemo()
//   console.log("render");
//   return <button onClick={onClick}>Mon boutton</button>;
// });
// const Button = React.memo(function () {
//   // .memo() similaire à React.useMemo()
//   console.log("render");
//   return <button>Mon boutton</button>;
// });
const Button = function () {
  // .memo() similaire à React.useMemo()
  console.log("render");
  return <button>Mon boutton</button>;
};

// const Button = function ({ onClick }) {
//   console.log("render");
//   return <button onClick={onClick}>Mon boutton</button>;
// };

const SecondButton = ({ onClick }) => {
  console.log("render 2");
  return <button onClick={onClick}>Mon 2e boutton</button>;
};

function App() {
  const [count, setCount] = React.useState(0);

  // MEMOÏSATION grâce à useMemo()
  // React détecte que le résultat de la fonct ne change pas, du coup il ne renvoit que le résultat déjà obtenu, mais ne relance pas une nouvelle instance de la fct.
  // Ainsi on ne régénère pas un nouvel objet à chaque rendu consécutif
  // const handleClick = React.useMemo(function () {
  //   return function () {
  //     alert("Bonjour");
  //   };
  // }, []);
  // const handleClick = function () {
  //   alert("Bonjour");
  // };
  // Ici on ne met aucune dépendance, car c'est un résultat simple, ne dépendant d'aucune variable
  // AVANT MEMOÏSATION:
  // const handleClick = function () {
  //   alert("Bonjour" + count);
  // };

  // Usage de useCallback
  // Ajout d'une dépendance
  // const secondHandleClick = React.useCallback(
  //   function () {
  //     alert("Bonjour " + count);
  //   },
  //   [count]
  // );

  // const handleClick = React.useMemo(function () {
  //   return function () {
  //     alert("Bonjour");
  //   };
  // }, []);

  return (
    <div>
      {/* <Button onClick={handleClick} /> */}
      <Button />
      <button onClick={() => setCount((c) => c + 1)}>
        {" "}
        {/* setCount() pour déclencher des rendus consécutifs */}
        Incrémenter {count}{" "}
      </button>
      <button onClick={() => alert("Bonjour " + count)}>
        Incrémenter {count + 1}{" "}
      </button>
      {/* <SecondButton onClick={secondHandleClick} /> */}
      <SecondButton
        onClick={() => {
          setCount((c) => c + 1);
          alert("Bonjour " + count);
        }}
      />
    </div>
  );
}
// EXPLICATIONS
// A faire
// <Button /> composant déclaration avec et sans React.memo()
// Le handleClick(), relié au onClick(), à déclarer avec et sans useMemo() ou useCallback()
// CONCLUSION
// A priori, on doit mémoîser le composant <Button /> && la fct handleClick() pour vraiment ne pas relancer de nouveau l'instance
// Pourquoi est ce que c'est la valeur d'un <button></button> et non d'un Composant qui déclenche les rendus.
// ON REMARQUE que les Composants aussi déclenchent les rendus, à condition d'avoir un State en eux.
// La question de déclencher ou pas un rendu est donc liée à la condition qu'un élément du DOM contienne un State ou pas.
// Reste à revérifier enlever/remettant les useMemo aux composants et au handleClick
// Explication: Les handleClick ne servent à rien ici, car on cherche à savoir si le Composant a été re rendu, donc c'est ce qu'il y a dans le rendu que l'on vérifie à savoir le console.log(render).
// Pourquoi alors est ce qu'on obtient un nouveau rendu quand on met la déclaration du Composant en useMemo et pas le handleClick()?
// Explication: Car lorsque l'on déclenche un nouveau rendu avec un clique sur le btn incrémenter, le composant App() est re rendu, et cela fait qu'il recréer ses constantes, ici handleClick et <Button /> l'intérprête comme une valeur nouvelle, ce qui le force à se re render et donc à se relancer et à afficher de nouveau console.log(render).
//  Ceci dit, on doit donc mémoîser le Composant && les constantes ou fonctions auxquelles il est lié afin de ne pas avoir de problèmes. En n'oubliant pas qu'il y a les dépendances qui servent à définir les conditions sous lesquelles une Callback doit être redéfinie (et par conséquent déclencher une nouvelle instance chez le Composant enfant qui contient cette Callback)
// A SAVOIR:
// Si on a juste un composant <Button /> qui n'a pas de lien en onClick ver sun handleClick, mais qui ne renvoie qu'un console.log(render), il sera nécessaire de le mémoîser individuellement quand même, c-a-d lui accoler React.memo() au préalable, sinon il sera re rendu à chaque rendu consécutif. Ensuite, s'il a un handleClick() ou tout autre élément qui risque d'être réinstancié en cas de rendu consécutif, il faudra mémoîser cet élément sinon, il forcera ce composant enfant à se re render.
// CONCLUSION:
// Il faut mémoîser le Composant et tout ce qu'il contient et qui est susceptible de se réinstancier en cas de rendu consécutif.

// function encode(number) {
//   wait(1000);
//   return Date.now();
// }

// function App() {
//   const [name, setName] = React.useState("John");
//   const [number, setNumber] = React.useState(0);

//   const onChange = (e) => {
//     if (e.target.getAttribute("name") === "name") {
//       setName(e.target.value);
//     }
//     if (e.target.name === "number") {
//       setNumber(e.target.value);
//     }
//   };

//   const encoded = React.useMemo(
//     function () {
//       return encode(number);
//     },
//     [number]
//   );

//   return (
//     <div className="App">
//       <div>
//         <label htmlFor="name"></label>
//         <input
//           onChange={onChange}
//           type="text"
//           name="name"
//           id="name"
//           value={name}
//         />
//       </div>
//       <div>
//         <label htmlFor="number"></label>
//         <input
//           onChange={onChange}
//           type="number"
//           name="number"
//           id="number"
//           value={number}
//         />
//       </div>
//       <h2>Encoded {encoded}</h2>
//     </div>
//   );
// }

export default App;
