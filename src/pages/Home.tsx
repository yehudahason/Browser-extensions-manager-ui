import Card from "../components/Card";

const Home = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <main className="main">
      <header className="top-nav">
        <div className="brand">
          <img src={`${base}assets/images/logo.svg`} alt="Extensions logo" />
        </div>

        <button className="theme-toggle" aria-label="Toggle theme">
          <img src={`${base}assets/images/icon-moon.svg`} alt="" />
        </button>
      </header>

      <section className="secondary-nav">
        <span className="section-title">Extension List</span>

        <ul className="filter-list">
          <li>
            <button className="filter-btn active">All</button>
          </li>
          <li>
            <button className="filter-btn">Active</button>
          </li>
          <li>
            <button className="filter-btn">Inactive</button>
          </li>
        </ul>
      </section>

      <div className="container">
        <Card />
      </div>
    </main>
  );
};

export default Home;
