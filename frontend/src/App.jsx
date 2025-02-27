import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AllProvider from "./Context/AllContext";
import AppNav from "./AppNav";
import NavBar from "./components/NavBar";

function App() {
  return (
    <AllProvider>
      <Theme>
        <NavBar />
        <AppNav />
      </Theme>
    </AllProvider>
  );
}

export default App;
