import { Outlet } from "react-router";
import "./App.css";
import Navber from "./components/layout/Navber/Navber";

function App() {
  return (
    <>
      <Navber />
      <div className="container">
        <div className="mt-[100px]">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            soluta laboriosam nobis incidunt iure aut ullam sint magnam nihil
            aspernatur alias error, laudantium facere quas amet magni et
            molestiae earum temporibus. Molestiae ea nesciunt doloremque quas
            odit, minus harum consectetur commodi optio quidem, repellendus
            facilis omnis numquam autem quaerat fugit laudantium assumenda
            provident modi iste. Suscipit laborum ducimus, doloremque nemo
            eveniet pariatur odit itaque eligendi eaque magnam eius, quis
            inventore nobis nisi est harum iure dolorem modi deleniti blanditiis
            ipsa numquam amet? Molestias, itaque, saepe assumenda accusamus,
            nihil asperiores quae quis delectus iure quidem laborum labore!
            Iusto provident animi obcaecati!
          </p>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default App;
