import { NavLink, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Practical1 from "./pages/Practical1";
import Practical2 from "./pages/Practical2";
import Practical3 from "./pages/Practical3";
import Practical4 from "./pages/Practical4";
import Practical5 from "./pages/Practical5";
import Practical6 from "./pages/Practical6";
import Practical7 from "./pages/Practical7";
import Practical8 from "./pages/Practical8";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span>GQL</span>
          <h2>Practicals</h2>
        </div>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/practical1">Practical 1</NavLink>
          <NavLink to="/practical2">Practical 2</NavLink>
          <NavLink to="/practical3">Practical 3</NavLink>
          <NavLink to="/practical4">Practical 4</NavLink>
          <NavLink to="/practical5">Practical 5</NavLink>
          <NavLink to="/practical6">Practical 6</NavLink>
          <NavLink to="/practical7">Practical 7</NavLink>
          <NavLink to="/practical8">Practical 8</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/practical1"
            element={<Practical1 />}
          />

          <Route
            path="/practical2"
            element={<Practical2 />}
          />

          <Route
            path="/practical3"
            element={<Practical3 />}
          />

          <Route
            path="/practical4"
            element={<Practical4 />}
          />

          <Route
            path="/practical5"
            element={<Practical5 />}
          />

          <Route
            path="/practical6"
            element={<Practical6 />}
          />

          <Route
            path="/practical7"
            element={<Practical7 />}
          />

          <Route
            path="/practical8"
            element={<Practical8 />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;