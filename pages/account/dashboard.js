import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";

const DashboardPage = ({ events }) => {
  const handleDelete = id => {
    console.log(id);
  };
  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h2>My Events</h2>
        {events.map(event => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { jwt } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me?[populate]=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      events: data,
    },
  };
}
