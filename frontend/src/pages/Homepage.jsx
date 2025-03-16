import { Link } from "react-router";
import PageNav from "./../components/PageNav";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Your Travels, Your Story
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that remembers every city you’ve visited. Relive your
          adventures and inspire others to explore.
        </h2>
        <Link to="/auth" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}

export default Homepage;
