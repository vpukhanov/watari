import type { NextPage } from "next";
import Head from "next/head";
import BigButton from "../components/big-button";
import s from "../styles/pages/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Literoad | Мониторинг производительности сайтов</title>
      </Head>
      <section className={`lr-container text-shadow ${s.preamble}`}>
        <h2>Мониторинг производительности сайтов</h2>
        <ul className={s.checklist}>
          <li>Ежедневные измерения</li>
          <li>Уведомления в Telegram</li>
          <li>Хранение истории в течение года</li>
        </ul>
        <div>
          <BigButton href="/auth/sign-up">Попробовать бесплатно</BigButton>
          <footer className={`muted ${s.footnote}`}>
            7 дней, без указания карты
          </footer>
        </div>
      </section>
      <section className="lr-container">
        <h2 className="text-center">Единый тариф</h2>
        <div className={s.tariff}>
          <div className={s.tariffLeft}>
            <p className={s.price}>1&nbsp;500&nbsp;₽</p>
            <p className="muted">за 30 дней</p>
          </div>
          <p className={s.tariffRight}>
            Тариф включает ежедневное измерение производительности
            10&nbsp;ресурсов (URL-адресов) с хранением истории изменений
            показателей.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
