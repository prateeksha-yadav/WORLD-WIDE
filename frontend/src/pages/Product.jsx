import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Welcome to <strong>WorldWise</strong>, your ultimate travel
            companion designed to document, track, and celebrate your journey
            across the globe. Whether you&apos;re a passionate traveler
            exploring cities or an adventurer conquering countries, WorldWise
            helps you create a personalized map of your travel story.
          </p>
          <p>
            At WorldWise, we believe that every journey has a story to tell. Our
            platform allows you to record the cities and countries you&apos;ve
            visited, giving you a bird&apos;s-eye view of your adventures. From
            bustling metropolises to tranquil getaways, we help you cherish your
            travel memories and inspire your future explorations.
          </p>
        </div>
      </section>
    </main>
  );
}
