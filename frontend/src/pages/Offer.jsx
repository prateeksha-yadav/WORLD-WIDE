import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

function Offers() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>What We Offer</h2>
          <ul className={styles.offerList}>
            <li>
              <strong>Personal Travel Map:</strong> Visualize the places
              you&apos;ve traveled to and see your footprint grow.
            </li>
            <li>
              <strong>Journey Insights:</strong> Track how many cities and
              countries you&apos;ve explored.
            </li>
            <li>
              <strong>Shareable Profiles:</strong> Showcase your travel
              achievements with friends and fellow explorers.
            </li>
            <li>
              <strong>Travel Goals:</strong> Set milestones for the places you
              dream of visiting. WorldWise
            </li>
          </ul>
          <p>
            WorldWise isn&apos;t just a travel tracker; it&apos;s a community of
            explorers, wanderers, and dreamers. We aim to ignite your curiosity,
            fuel your wanderlust, and provide tools to make your travel
            experiences unforgettable.
          </p>
          <p>
            Start your journey today with WorldWise and see how far your
            adventures can take you!
          </p>
          <p className={styles.quote}>
            <strong>Your world. Your travels. Your story.</strong>
          </p>
        </div>
        <img
          src="img-2.avif"
          alt="Street of Bellagio, Italy"
          className={styles.sideImage}
        />
      </section>
    </main>
  );
}

export default Offers;
