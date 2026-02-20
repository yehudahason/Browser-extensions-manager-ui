import { useEffect, useState } from "react";
import Card from "../components/Card";
import { type CardsArray } from "../types/types";
const Home = () => {
  const base = import.meta.env.BASE_URL;
  const [data, setData] = useState<CardsArray>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base}/data.json`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
        {data.map((card, index) => (
          <Card
            key={index}
            logo={card.logo}
            name={card.name}
            description={card.description}
            isActive={card.isActive}
            index={card.index}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
